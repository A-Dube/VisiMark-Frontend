import React, { useState, useContext, useEffect } from 'react';
import Header from '../NavBar/Header';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HDBGImg from '../../assets/HDBG.png';
import HDImg from '../../assets/HD.png';

const HelpDesk = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://your-backend-api/send-email", { subject, message });
      if (response.status !== 200) throw new Error("Failed to send email");

      setStatus("Email sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("Failed to send email.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#022535] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-full max-h-full">
      <Header />
      <section className="relative rounded-lg shadow-md pt-[200px] min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 backdrop-blur-[20px] backdrop-filter -z-20"
          style={{ backgroundImage: `url(${HDBGImg})` }}
        ></div>
        <div className="absolute inset-0 bg-[#032636] opacity-95 -z-10"></div>
        <div className='flex flex-row'>
          <div className="relative bg-[#134558] p-10 rounded-xl shadow-2xl w-[600px] flex flex-col items-center">
            <h2 className="text-3xl text-[#F0F6DF] font-semibold text-center mb-8 tracking-wide">
              Help Desk
            </h2>
            <div className="rounded-2xl bg-gradient-to-r from-[#134558] to-[#2995BE] p-4 font-sans text-white shadow-lg relative w-[400px] overflow-hidden">
              <svg
                className="absolute top-0 left-0 w-full h-16"
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 80 Q100 0 450 80 V80 H10 Z"
                  fill="rgba(255, 255, 255, 0.12)"
                />
              </svg>

              <div className="relative z-10 flex items-center gap-2 mb-6">
                <div className="bg-white bg-opacity-30 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="font-semibold text-white">Chat with Admin</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border p-2 rounded bg-[#AEC3B1]"
                  required
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border p-2 rounded h-24 bg-[#AEC3B1]"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Send Email
                </button>
              </form>
              {status && <p className="mt-3 text-center">{status}</p>}
            </div>
          </div>
          <img src={HDImg} alt="HD" className='w-96 h-96 flex mt-10 p-5'/>
        </div>
      </section>
    </div>
  );
};

export default HelpDesk;
