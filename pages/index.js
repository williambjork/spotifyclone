
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar';

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden">
        <main>
          <Sidebar />

          {/*center */}

          <div> {/* player */}</div>
          
        </main>
      </div>
    </>
  ); 
}


