
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center';
import Sidebar from '../components/sidebar';

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />

          

          <div> {/* player */}</div>
          
        </main>
      </div>
    </>
  ); 
}


