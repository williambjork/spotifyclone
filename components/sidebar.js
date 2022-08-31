import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify'
import { playlistIdState } from "../atoms/playlistAtom"
import { likedPlaylistState } from "../atoms/likedPlaylistAtom"

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  
  const [ likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  
  function handleLikedTracks() {
    spotifyApi
    .getMySavedTracks()
    .then((data) => {
      setLikedPlaylist(data.body.items)
    })
    console.log(likedPlaylist)
  }
  
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistId])
  

  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5 
                    text-xs lg:text-sm text-gray-500 scrollbar-hide
                    sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        
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
          <h3>Your episodes</h3>
        </button>
        <button onClick={handleLikedTracks} className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <h3>Liked songs</h3>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"></hr>

        {playlists.map((playlist) => {
         return <h2 key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
            {playlist.name}
          </h2>
        })}

      </div>
    </div>
  );
}

export default Sidebar;
