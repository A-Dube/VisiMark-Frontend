import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LogoImg from "../../assets/Logo.png";
import GoogleImg from "../../assets/Google.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ULogin = () => {
  const { login, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(
        "https://vishimark-b.onrender.com/auth/login",
        { email, password }
      );
      const data = res.data;

      if (res.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        await login(data.token);
        toast.success("Login successful!", { position: "top-center" });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Incorrect email or password!", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#12232D] via-[#476C7B] to-[#b1cab8] overflow-auto">
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-center justify-center rounded-xl overflow-y-hidden">
        <div className="flex items-stretch justify-center">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#AEC3B1] via-[#588292] to-[#F0F6DF] p-10">
            <img src={LogoImg} alt="Logo" className="w-32 h-32 mb-2" />
            <h3 className="font-semibold text-white">VisiMark</h3>
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-10">
            <div className="relative w-full flex justify-center items-start mb-4">
              <Link to="/login">
                <button className="absolute left-0 top-0 px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90">
                  ←
                </button>
              </Link>
              <h2 className="text-xl font-semibold text-[#0b1d26]">User Sign In</h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full max-w-sm p-6"
            >
              <input
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded-md w-full"
                required
              />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-md w-full"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-3 py-2 ${loading ? "bg-gray-500" : "bg-[#588292]"} text-white rounded-md hover:opacity-90 w-full`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p>OR</p>
              <Link to="/signup">
                <button type="button" className="px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90 w-full">Sign Up</button>
              </Link>
            </form>
            <div className="my-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
              <hr className="w-16" /> Sign in with social media <hr className="w-16" />
            </div>
            <button className="flex items-center justify-center px-3 py-2 text-md text-center text-[#588292] hover:opacity-90 gap-2">
              <img src={GoogleImg} alt="Google" className="w-10 h-5" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
};

export default ULogin;
