import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

import Logo from '../../assets/Logo.png'
import Banner from '../../assets/Attendence_Banner.png'

const Header = () => {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState([])
  const navigate = useNavigate()

  const pages = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Statistics', path: '/statistics' },
    { name: 'Profile', path: '/user' },
    { name: 'Help Desk', path: '/helpdesk' },
    { name: 'Attendance', path: '/mark' },
    { name: 'Attendance Calendar', path: '/attendcal' },
    { name: 'Notice', path: '/notice' },
  ]

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([])
      return
    }
    const matches = pages.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(matches)
  }, [query])

  const handleSelect = (path) => {
    setQuery('')
    setFiltered([])
    navigate(path)
  }

  return (
    <header className="absolute top-0 w-full h-64 text-white overflow-hidden">
      <img
        src={Banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#588292] via-[#456C7C] to-[#1D4557] opacity-85" />
      <div className="relative z-10 w-full px-10 py-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full" />
            <h3 className="text-2xl font-sans text-[#F0F6DF] border-e-4 border-white pe-6">VisiMark</h3>
            <nav className="hidden md:flex items-center gap-8 text-base font-medium">
              {pages.slice(0, 3).map((page, i) => (
                <Link
                  key={i}
                  to={page.path}
                  className="hover:text-[#F0F6DF] transition border-b-2 border-transparent hover:border-white"
                >
                  {page.name}
                </Link>
              ))}
              <Link to="/login" className="hover:text-[#F0F6DF] transition border-b-2 border-transparent hover:border-white">Logout</Link>
            </nav>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Link to="/notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#F0F6DF" viewBox="0 0 24 24">
                  <path d="M12 24c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6.36-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v7l-2 2v1h16v-1l-1.64-2z" />
                </svg>
                </Link>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#1D4557]"></span>
              </div>
              <Link to="/helpdesk">
                <button className="bg-[#588292] hover:bg-[#456C7C] text-white font-medium px-4 py-2 rounded-lg transition">
                  Raise Issue
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mt-8 w-full">
          <h3 className="font-sans text-2xl font-semibold text-white mb-6">
            Welcome User, What can we help you with?
          </h3>
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="Find help, services and solutions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full text-gray-700 placeholder-gray-400 shadow-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            {filtered.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white text-black rounded-xl mt-2 shadow-lg max-h-56 overflow-y-auto z-50">
                {filtered.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect(item.path)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
