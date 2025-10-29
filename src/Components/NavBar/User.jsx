import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/Logo.png';
import UserImg from '../../assets/user.png';

const User = () => {
  const { isAuthenticated, loading, token, user: authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get('https://vishimark-b.onrender.com/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#022535] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#022535] pt-[250px]">
      <Header/>
      <main className="flex flex-col items-center gap-16 p-4">
        <h1 className='text-[#F0F6DF] text-4xl font-semibold p-4 text-left'>User Profile</h1>
        <div className='flex flex-col items-center justify-center border border-[#F0F6DF] w-[1000px]'>
          <img 
            src={user.imageUrl || LogoImg} 
            alt="img" 
            className='w-40 h-40 object-cover rounded-full flex items-center justify-center mt-5 -mb-5' 
          />

          <div className='flex flex-row items-center justify-center text-left text-2xl font-sans p-10 space-y-4'>
            <div className='flex flex-col p-7 mr-14'>
              <h3 className='text-[#F0F6DF]'>Full Name:</h3>
              <p className='text-[#AEC3B1] border-b-2 '>{user.name || "User"}</p>
              <h3 className='text-[#F0F6DF]'>User ID:</h3>
              <p className='text-[#AEC3B1] border-b-2 '>{user.id || "1234ID"}</p>
              <h3 className='text-[#F0F6DF]'>Email ID:</h3>
              <p className='text-[#AEC3B1] border-b-2 '>{user.email || "Email"}</p>
              <h3 className='text-[#F0F6DF]'>Contact:</h3>
              <p className='text-[#AEC3B1] border-b-2 '>{user.contact || "1234567889"}</p>
            </div>
            <img src={UserImg} alt="User" className='w-96 h-96 flex p-5'/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
