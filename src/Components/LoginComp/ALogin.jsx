import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import LogoImg from '../../assets/Logo.png'
import GoogleImg from '../../assets/Google.png'

const ALogin = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        login(data.token)
        navigate('/dashboard')
      } else {
        alert(data.message || 'Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      alert('Login failed. Try again.')
    }
  }

  return (
    <div className='relative w-full min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#12232D] via-[#476C7B] to-[#b1cab8] bg-[length:400%_400%] animate-[gradientMove_5s_ease_infinite] overflow-auto'>
      <div className='relative w-full min-h-screen flex items-center justify-center overflow-auto'>
        <div className='flex flex-row items-center justify-center rounded-xl overflow-hidden'>
          <div className="flex items-stretch justify-center">
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#AEC3B1] via-[#588292] to-[#F0F6DF]">
              <div className="p-10 text-white">
                <img src={LogoImg} alt="Logo" className="w-32 h-32 mb-2" />
                <h3 className="font-semibold">VisiMark</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-white p-8">
              <div className="relative w-full flex justify-center items-start py-4">
                <Link to="/login">
                  <button className="absolute left-0 top-0 px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90">←</button>
                </Link>
                <h2 className="text-xl font-semibold text-[#0b1d26]">Admin Sign In</h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between gap-4 w-80 p-6 bg-slate-white">
                <h4 className="text-l font-light text-center">Sign in to your account via email</h4>
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern=".+@akgec\.ac.in"
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <div className="grid grid-rows-3 gap-2 items-center justify-center text-center">
                  <button type="submit" className="px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90">
                    Sign In
                  </button>
                  <p>OR</p>
                  <Link to="/signup">
                    <button type="button" className="px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </form>

              <div className="my-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <hr className="w-16" /> Sign in with social media <hr className="w-16" />
              </div>
              <button className="flex items-center justify-center px-3 py-2 text-md text-center text-[#588292] hover:opacity-90">
                <img src={GoogleImg} alt="Google" className="w-10 h-5" />Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ALogin
