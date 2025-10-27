import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LogoImg from '../../assets/Logo.png';
import axios from "axios";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [contact, setContact] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userID", userID);
    formData.append("contact", contact);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://vishimark-b.onrender.com/auth/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        login(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#12232D] via-[#476C7B] to-[#b1cab8] bg-[length:200%_200%] animate-[gradientMove_5s_ease_infinite] overflow-auto">
      <div className="flex flex-col md:flex-row items-center justify-center rounded-xl overflow-y-hidden">
        <div className="flex items-stretch justify-center">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#AEC3B1] via-[#588292] to-[#F0F6DF] p-10">
            <img src={LogoImg} alt="Logo" className="w-32 h-32 mb-2" />
            <h3 className="font-semibold text-white">VisiMark</h3>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-10">
            <div className="relative w-full flex justify-center items-start mb-4">
              <Link to="/login">
                <button className="absolute left-0 top-0 px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90">←</button>
              </Link>
              <h2 className="text-xl font-semibold text-[#0b1d26]">User Sign Up</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm p-6">
              <input type="text" placeholder="Enter your Full Name" value={name} onChange={(e) => setName(e.target.value)} className="px-4 py-2 border rounded-md w-full" required />
              <input type="email" placeholder="Enter your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@gmail\.com" className="px-4 py-2 border rounded-md w-full" required />
              <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 border rounded-md w-full" required />
              <input type="number" placeholder="Enter UserID" value={userID} onChange={(e) => setUserID(e.target.value.replace(/\D/, ""))} className="px-4 py-2 border rounded-md w-full" step="1" required />
              <input type="number" placeholder="Enter Contact" value={contact} onChange={(e) => setContact(e.target.value.replace(/\D/, ""))} className="px-4 py-2 border rounded-md w-full" step="1" required />

              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> : <p className="text-gray-500 text-lg">Upload</p>}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} />

              <button type="submit" className="px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90 w-full">Sign Up</button>
              <p>OR</p>
              <Link to="/ulogin">
                <button type="button" className="px-3 py-2 bg-[#588292] text-white rounded-md hover:opacity-90 w-full">Sign In</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;