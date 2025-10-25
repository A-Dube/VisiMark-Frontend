import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const navigate = useNavigate();

  return (
    
    <div className="w-full min-h-screen bg-[#022535] pt-[250px]">
      <Header/>
    <main className="flex flex-row gap-16 p-8">
      <div className='flex-1 grid grid-rows-2 gap-12 ps-8'>
        <div className='grid grid-cols-2 gap-8'>
          <button onClick={() => navigate("/mark")} className='grid grid-cols-3 items-center rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
            <div className='flex items-center justify-center'>
              <img src="src\assets\Icons\Vector1.png" alt="vector1"/>
            </div>
            <div className='col-span-2'>
              <p className='text-lg text-[#F0F6DF]'>Mark Attendence</p>
              <p className='text-[#F0F6DF] text-sm'>Biometric system that automatically identifies individuals.</p>
            </div>
          </button>
          <button onClick={() => navigate("/attendcal")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
            <div className='flex items-center justify-center'>
              <img src="src\assets\Icons\Vector2.png" alt="vector2"/>
            </div>
            <div className='col-span-2'>
              <p className='text-lg text-[#F0F6DF]'>Attendence Calender</p>
              <p className='text-[#F0F6DF] text-sm'>View your attendance for the current month.</p>
            </div>
          </button>
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <button onClick={() => navigate("/notice")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src="src\assets\Icons\Vector4.png" alt="vector4"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>Notice Board</p>
                <p className='text-[#F0F6DF] text-sm'>Public forum to update with the latest announcements.</p>
              </div>
            </button>
            <button onClick={() => navigate("/helpdesk")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src="src\assets\Icons\Vector5.png" alt="vector5"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>HelpDesk</p>
                <p className='text-[#F0F6DF] text-sm'>Raise issues or get support quickly.</p>
              </div>
            </button>
          </div>
      </div>
      <div className='flex flex-1 justify-center items-center'>
        <img src="src/assets/Dash.png" alt="Dash" className=''/>
      </div>
    </main>
    </div>
  )
}

export default Dashboard
