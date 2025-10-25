import {useState,useEffect} from 'react'
import Header from './Header'
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://10.120.167.114:5000/api/user')
      setUser(res.data)
    }
    fetchUser()
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#022535] pt-[250px]">
      <Header/>
    <main className="flex flex-col items-center gap-16 p-4">
      <h1 className='text-[#F0F6DF] text-4xl font-semibold p-4 text-left'>User Profile</h1>
      <div className='flex flex-col items-center justify-center border border-[#F0F6DF] w-[1000px]'>
        <img src={user.imageUrl || "src/assets/Logo.png"} alt="img" className='w-40 h-40 object-cover rounded-full flex items-center justify-center mt-5 -mb-5' />

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
            <img src="src\assets\user.png" alt="User" className='w-96 h-96 flex p-5'/>
        </div>
        </div>
        </main>
        </div>
  )
}

export default User
