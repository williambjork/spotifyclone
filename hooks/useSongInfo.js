import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil";
import { currentTrackIdState,  } from "../atoms/songAtom";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

function useSongInfo() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [ currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    const [ songInfo, setSongInfo ] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json());
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo();

    }, [currentTrackId, spotifyApi])

  return songInfo;
    
  
}

export default useSongInfo