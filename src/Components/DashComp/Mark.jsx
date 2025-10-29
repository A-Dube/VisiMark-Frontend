import React, { useEffect, useState, useContext, useRef } from 'react'
import Header from '../NavBar/Header'
import Webcam from 'react-webcam'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import markImg from '../../assets/Mark.png'

const Mark = () => {
  const { token, loading, user: authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [img, setImg] = useState("")
  const [result, setResult] = useState("")
  const webRef = useRef("")

  const captureAndSend = async () => {
    const imageSrc = webRef.current.getScreenshot()
    setImg(imageSrc)
    const blob = await fetch(imageSrc).then(r => r.blob())
    const formData = new FormData()
    formData.append("image", blob, "capture.jpg")

    try {
      const res = await axios.post(
        "https://vishimark-b.onrender.com/attendance/mark",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setResult(res.data.message || "Attendance marked ✅")
    } catch (err) {
      console.error("Verification failed:", err)
      setResult("Error ❌")
    }
  }

  if (loading || !authUser) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#022535] text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#022535] pt-[150px] overflow-x-hidden">
      <Header/>
      <main className="flex flex-col gap-16 p-24">
        <h1 className='text-[#AEC3B1] text-4xl font-semibold p-4 text-left'>Mark Attendance</h1>
        <div className='flex flex-row items-center justify-between border border-[#F0F6DF] gap-15 p-10'>
          <div className='flex flex-row items-center justify-center text-left text-2xl font-sans gap-16'>
            <div className='flex flex-col'>
              <div className='border-[16px] border-[#AEC3B1]'>
                <Webcam 
                  className="border-[10px] border-[#134558] w-80 h-66"
                  audio={false}
                  ref={webRef}
                  screenshotFormat="image/jpeg"
                />
              </div>
              <button onClick={captureAndSend} className='bg-[#588292] text-white rounded-md px-4 py-2 mt-4 hover:opacity-90'>
                Mark
              </button>
              {result && <p className="text-white mt-4">{result}</p>}
            </div>
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-row gap-12 border border-[#F0F6DF] bg-gradient-to-t from-[#AEC3B1] via to-[#AEC3B133] p-6 rounded-xl font-sans font-semibold text-lg'>
                <div>
                  <h3 className='text-[black]'>Name:</h3>
                  <h3 className='text-[black]'>User ID:</h3>
                  <h3 className='text-[black]'>Date:</h3>
                  <h3 className='text-[black]'>Attendance marked:</h3>
                </div>
                <div>
                  <h3 className='text-[#022535]'>{authUser.name || 'User'}</h3>
                  <h3 className='text-[#022535]'>{authUser.userId || '1234ID'}</h3>
                  <h3 className='text-[#022535]'>{new Date().toLocaleDateString()}</h3>
                  <h3 className='text-[#022535]'>{result ? 'Yes' : 'No'}</h3>
                </div>
              </div>
              <div className='flex flex-row gap-12 border border-[#F0F6DF] bg-gradient-to-b from-[#134558] via to-[#2995BE] p-6 rounded-xl font-sans font-semibold text-lg'>
                <div>
                  <h3 className='text-[black]'>Total Days</h3>
                  <h3 className='text-[black]'>Present:</h3>
                  <h3 className='text-[black]'>Absent:</h3>
                  <h3 className='text-[black]'>Current Day Attendance:</h3>
                </div>
                <div>
                  <h3 className='text-[#022535]'>50</h3>
                  <h3 className='text-[#022535]'>35</h3>
                  <h3 className='text-[#022535]'>15</h3>
                  <h3 className='text-[#022535]'>{result ? 'Present' : 'Absent'}</h3>
                </div>
              </div>
            </div>
          </div>
          <img src={markImg} alt="img" className='w-96 h-96' />
        </div>
      </main>
    </div>
  )
}

export default Mark
