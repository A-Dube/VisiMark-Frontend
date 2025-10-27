import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Statistics() {
  const { isAuthenticated, loading, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalUserAttendance, setTotalUserAttendance] = useState(0);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchAttendance = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          "https://vishimark-b.onrender.com/attendance/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setAttendanceRecords(res.data.data);

          // Optional: calculate totals
          setTotalClasses(res.data.data.length);
          setTotalUserAttendance(
            res.data.data.filter((rec) => rec.status === "Present").length
          );
        }
      } catch (err) {
        console.error("Failed to fetch attendance records:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchAttendance();
  }, [token]);

  const percentage = totalClasses
    ? Math.round((totalUserAttendance / totalClasses) * 100)
    : 0;

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#072c3d]">
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#072c3d] flex flex-col items-center justify-center pt-[200px] text-gray-100 overflow-x-hidden">
      <Header />
      <h1 className="text-4xl font-bold mb-10 tracking-wide">Statistics</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="relative flex items-center justify-center">
          <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#1e3a3a" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#9cb0a0"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 282.6} 282.6`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <p className="text-4xl font-bold">{percentage}%</p>
            <p className="text-lg">
              {totalUserAttendance}/{totalClasses} classes
            </p>
            <p
              className={`font-semibold mt-2 ${
                percentage >= 75
                  ? "text-green-500"
                  : percentage >= 50
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              {percentage >= 75 ? "Excellent" : percentage >= 50 ? "Average" : "Poor"}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#5f7f7e] to-[#4a6464] rounded-lg p-6 w-[380px] shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center">Comparison Chart</h2>

          <div className="flex justify-between items-end h-48 px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#1c3c3c] scrollbar-track-transparent">
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((d, i) => {
                const classHeight = totalClasses > 0 ? (1 / totalClasses) * 150 : 0; // adjust if needed
                const userHeight =
                  totalClasses > 0
                    ? d.status === "Present"
                      ? (1 / totalClasses) * 150
                      : 0
                    : 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="bg-[#1c3c3c] w-3 rounded transition-all duration-300"
                      style={{ height: `${classHeight}px` }}
                    ></div>
                    <div
                      className="bg-[#9bbab8] w-3 rounded transition-all duration-300"
                      style={{ height: `${userHeight}px` }}
                    ></div>
                    <span className="text-sm mt-1">{d.date}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-white/80 w-full">No data available</p>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-[#1c3c3c] rounded"></span>
              Class Attendance
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-[#9bbab8] rounded"></span>
              Your Attendance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;