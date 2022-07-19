import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    HeartIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
        const { data: session, status } = useSession();
        console.log(session);
        console.log("poo");

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
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    <h3 className="cursor-pointer hover:text-white">Playlist Name... </h3>
                    
                    
                    
                    
                            
                  </div>
            </div>
        
    )
}

export default Sidebar