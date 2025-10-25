import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Statistics() {
  const { isAuthenticated, loading, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalUserAttendance, setTotalUserAttendance] = useState(0);

  useEffect(() => {
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (token) fetchAttendanceData();
  }, [token]);

  const fetchAttendanceData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setAttendanceData(data.monthly); // assuming backend returns monthly array with { label, classAttendance, userAttendance }
        setTotalClasses(data.totalClasses);
        setTotalUserAttendance(data.totalUserAttendance);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    }
  };

  const percentage = totalClasses ? Math.round((totalUserAttendance / totalClasses) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#072c3d]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#072c3d] flex flex-col items-center justify-center pt-[200px] text-gray-100">
      <Header/>
      <h1 className="text-4xl font-bold mb-10 tracking-wide">Statistics</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-[14px] border-[#9cb0a0]">
          <div className="absolute flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">{percentage}%</p>
            <p className="text-lg">{totalUserAttendance}/{totalClasses} classes</p>
            <p className={`font-semibold mt-2 ${percentage >= 75 ? "text-green-600" : percentage >= 50 ? "text-yellow-500" : "text-red-600"}`}>
              {percentage >= 75 ? "Good" : percentage >= 50 ? "Average" : "Poor"}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#5f7f7e] to-[#4a6464] rounded-lg p-6 w-[380px] shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center">Comparison Chart</h2>

          <div className="flex justify-between items-end h-48 px-4 overflow-x-auto">
            {attendanceData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="bg-[#1c3c3c] w-3 rounded"
                  style={{ height: `${(d.classAttendance / totalClasses) * 150}px` }}
                ></div>
                <div
                  className="bg-[#9bbab8] w-3 rounded"
                  style={{ height: `${(d.userAttendance / totalClasses) * 150}px` }}
                ></div>
                <span className="text-sm mt-1">{d.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-[#1c3c3c] rounded"></span>
              Class Attendance Average
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-[#9bbab8] rounded"></span>
              User Attendance Average
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
