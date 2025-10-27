import React, { useContext } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Vector1 from '../../assets/Icons/Vector1.png';
import Vector2 from '../../assets/Icons/Vector2.png';
import Vector4 from '../../assets/Icons/Vector4.png';
import Vector5 from '../../assets/Icons/Vector5.png';
import DashImg from '../../assets/Dash.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#022535] text-white">
        Loading...
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen bg-[#022535] pt-[250px]">
      <Header/>
      <main className="flex flex-row gap-16 p-8">
        <div className='flex-1 grid grid-rows-2 gap-12 ps-8'>
          <div className='grid grid-cols-2 gap-8'>
            <button onClick={() => navigate("/mark")} className='grid grid-cols-3 items-center rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src={Vector1} alt="vector1"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>Mark Attendance</p>
                <p className='text-[#F0F6DF] text-sm'>Biometric system that automatically identifies individuals.</p>
              </div>
            </button>
            <button onClick={() => navigate("/attendcal")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src={Vector2} alt="vector2"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>Attendance Calendar</p>
                <p className='text-[#F0F6DF] text-sm'>View your attendance for the current month.</p>
              </div>
            </button>
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <button onClick={() => navigate("/notice")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src={Vector4} alt="vector4"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>Notice Board</p>
                <p className='text-[#F0F6DF] text-sm'>Public forum to update with the latest announcements.</p>
              </div>
            </button>
            <button onClick={() => navigate("/helpdesk")} className='rounded-lg bg-[#134558] px-4 py-5 hover:bg-[#134558] hover:scale-105 transition-all duration-300'>
              <div className='flex items-center justify-center'>
                <img src={Vector5} alt="vector5"/>
              </div>
              <div className='col-span-2'>
                <p className='text-lg text-[#F0F6DF]'>HelpDesk</p>
                <p className='text-[#F0F6DF] text-sm'>Raise issues or get support quickly.</p>
              </div>
            </button>
          </div>
        </div>
        <div className='flex flex-1 justify-center items-center'>
          <img src={DashImg} alt="Dash" className=''/>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
