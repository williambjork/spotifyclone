import { Console } from "console";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.refreshAccessToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,

            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }

    } 
    
    catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,

    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },

  callbacks: {

    // check if user first login. If so return token withh access, refresh, username and expiry.
    // If token exists and is not expired return token
    // If token expired call refreshToken method
    async jwt({ token, account, user }) 
    {

        // initial sign in
        if (account && user) {
            return {
                ...token,
                accesToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000,
            }
        }

        // return if token not expired
        if (Date.now() < token.accessTokenExpires) {
            Console.log("TOKEN VALID AF")
            return token;
        }

    
        console.log("TOKEN EXPIRED");
        return await refreshAccessToken(token);
    },

    // create session for user
    async session ({ session, token}) {
        session.uer.accessToken = token.acessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    },
  },
});