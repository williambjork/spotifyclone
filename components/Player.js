import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import useSongInfo from "../hooks/useSongInfo"
import { useState } from "react"

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState)

    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [ volume, setVolume ] = useState(80);

    const songInfo = useSongInfo();

  return (
    <div>
        <div>
            <img className="hidden sm:inline h-10 w-10"
            src={songInfo?.album.images?.[0].url} alt="" />
        </div>
    </div>
  )
}

export default Player