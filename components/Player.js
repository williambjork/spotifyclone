import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { useEffect, useState } from 'react'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(80)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            console.log("Now playing: ", data.body?.item)
            setCurrentTrackId( data.body?.item?.id);
        

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                setIsPlaying(data.body?.is_playing)
          })
     });
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {

            fetchCurrentSong();
            setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session])

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900'>
      <div>
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
      </div>

      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
    </div>
  )
}

export default Player
