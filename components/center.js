import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

const colors = [
  'from-indingo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState);

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""/>
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5 " />
        </div>
        
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b 
            to-black ${color} h-80 w-full p-8 text-white`}
      ></section>
    </div>
  )
}

export default Center
