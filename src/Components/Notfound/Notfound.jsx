import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/idk.png'

export default function Notfound() {
  return <>
<div>
<style dangerouslySetInnerHTML={{ __html: `
  .gradient {
    background-image: linear-gradient(360deg, #FFEDE1 0%, #F9FBF2 25%, #D7F9FF 50%, #AFCBFF 75%, #0E1C36 100%);
}
` }} />
  <div className="gradient text-[#162447] min-h-screen flex items-center">
    <div className="container mx-auto p-4 flex flex-wrap items-center">
      <div className="w-full md:w-5/12 text-center p-4">
        <img src={img} className='object-contain' />
      </div>
      <div className="w-full md:w-7/12 text-center md:text-left p-4">
        <div className="text-6xl font-medium">404</div>
        <div className="text-xl md:text-3xl font-medium mb-4">
          Oops. This page has gone missing.
        </div>
        <div className="text-lg mb-8">
          You may have mistyped the address or the page may have moved.
        </div>
        <Link to={'/'} className="border border-[#162447] rounded p-4 hover:bg-[#162447] hover:text-white">Go Home</Link>
      </div>
    </div>
  </div>
</div>

    </>
  
}
