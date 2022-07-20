import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    HeartIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";



function Sidebar() {
        const spotifyApi = useSpotify();
        const { data: session, status } = useSession();
        const [playlists, setPlaylists] = useState([]);
         
        useEffect(() => {
          if (spotifyApi.getAccessToken()) {
                spotifyApi.getUserPlaylists().then((data) => {
                    setPlaylists(data.body.items);
                });
       
          }
        }, [session, spotifyApi]);
        
        console.log(playlists);
        console.log(session);

    return(
        
            <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
                <div className="space-y-4">
                    <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                        <RssIcon className="h-5 w-5" />
                        <h3>Logout</h3>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <HomeIcon className="h-5 w-5" />
                        <h3>Home</h3>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <SearchIcon className="h-5 w-5" />
                        <h3>Search</h3>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <LibraryIcon className="h-5 w-5" />
                        <h3>Your Library</h3>
                    </button>

                
                    <hr className="border-t-[0.1px] border-gray-900"></hr>
                
                    <button className="flex items-center space-x-2 hover:text-white">
                        <PlusCircleIcon className="h-5 w-5" />
                        <h3>Create Playlist</h3>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <RssIcon className="h-5 w-5" />
                        <h3>Your  episodes</h3>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <HeartIcon className="h-5 w-5" />
                        <h3>Liked songs</h3>
                    </button>

                    <hr className="border-t-[0.1px] border-gray-900"></hr>

                    {playlists.map((playlist) => {
                        <p key={playlist.id} className="cursor-pointer hover:text-white">
                           {playlists} 
                        </p>
                    })}
                    
                    
                    
                    
                    
                    
                            
                  </div>
            </div>
        
    )
}

export default Sidebar