import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const navigate= useNavigate("");
  const [role, setRole] = useState("");
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <>
    
  <div className="absolute inset-0 w-full min-h-screen overflow-hidden">
  <div className="absolute inset-0 bg-[url('src/assets/HDBG.png')] bg-cover bg-center bg-no-repeat opacity-50 -z-20"></div>
  <div className="absolute inset-0 bg-gradient-to-tl from-[#022535] via-[#476C7B] to-[#134558] opacity-95 -z-10" style={{ backgroundSize: '400% 400%', animation: 'gradientMove 8s ease infinite', }} ></div>
    <div className="relative z-10 flex items-center justify-center min-h-screen">
    <div className="flex w-96 overflow-hidden">
      <img src="src/assets/Logo1.png" alt="Logo1" className="w-full h-auto" />
    </div>



      <div className="flex flex-col items-center border-white/20 bg-white/10 backdrop-blur-[10px] rounded-xl backdrop-filter p-7">
      
        <h2 className="text-2xl font-semibold text-[#AEC3B1] mb-4 text-center">Select Login Type</h2>
          <div className="flex items-center justify-center bg-[#AEC3B1] p-4 rounded-xl">
          
            <div className="flex flex-col items-center justify-center gap-6 p-7">
              
              <div className="flex flex-col items-center gap-6">
                <Link to="/ulogin">
                <button onClick={() => handleRoleSelect("user")} className="px-6 py-3 bg-[#134558] text-[#F0F6DF] rounded-md text-lg hover:opacity-90 transition">
                  User Login
                </button>
                </Link>
                <Link to="/alogin">
                <button onClick={() => handleRoleSelect("admin")} className="px-6 py-3 bg-[#134558] text-[#F0F6DF] rounded-md text-lg hover:opacity-90 transition">
                  Admin Login
                </button>
                </Link>
              </div>
            </div>
            </div>
        </div>

      </div>
      </div>
    </>
  );
};

export default Login;
