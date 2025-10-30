import React from 'react'
import HDBGImg from '../assets/HDBG.png';
import Logo from '../assets/Logo.png'

const Landing = () => {
  return (
    <>
      <div className="absolute inset-0 w-full min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 -z-20"
          style={{ backgroundImage: `url(${HDBGImg})` }}>
        </div>
        <div
        className="absolute inset-0 bg-gradient-to-tl from-[#022535] via-[#476C7B] to-[#134558] opacity-95 -z-10"
        style={{ backgroundSize: '400% 400%', animation: 'gradientMove 8s ease infinite' }}>
        </div>
        </div>
        <header>
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full" />
            <h3 className="text-2xl font-sans text-[#F0F6DF] border-e-4 border-white pe-6">VisiMark</h3>
          </div>
        </header>
    </>
  )
}

export default Landing
