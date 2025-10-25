import React, { useState, useEffect, useContext } from 'react';
import Header from '../NavBar/Header';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Attendcal = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [attLoading, setAttLoading] = useState(false);
  const perPage = 8;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      setPage(1);
      fetchAttendance();
    }
  }, [month, year, userId]);

  const fetchUser = async () => {
    try {
      setAttLoading(true);
      const res = await fetch(`http://localhost:8080/user`, {
        credentials: 'include',
      });
      const data = await res.json();
      setUserId(data._id);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setAttLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      setAttLoading(true);
      const res = await fetch(`http://localhost:8080/attendance/${userId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      const filtered = data.filter((entry) => {
        const dateObj = new Date(entry.date);
        return dateObj.getMonth() === month && dateObj.getFullYear() === year;
      });
      setAttendance(filtered);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setAttLoading(false);
    }
  };

  const startIndex = (page - 1) * perPage;
  const paginated = attendance.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(attendance.length / perPage);

  if (loading || attLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#12232D] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#12232D] pt-[180px]">
      <Header />
      <div className="flex flex-col p-6">
        <h2 className="text-4xl text-[#AEC3B1] font-semibold">Attendance Calendar</h2>
        <div className="max-w-[1280px] w-full mx-auto mt-5 bg-gradient-to-b from-[#0A3240] to-[#1B5561] rounded-2xl p-6 shadow-lg text-white">
          <div className="flex justify-center gap-2 mb-6">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="rounded-lg px-3 py-1 text-black font-medium"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-lg px-3 py-1 text-black font-medium"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {paginated.length > 0 ? (
            <div className="space-y-3">
              {paginated.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-lg px-4 py-2 shadow-md"
                >
                  <span className="text-[#0A3240] font-medium">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === "Present" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/80">No records found</p>
          )}

          <div className="flex justify-between items-center mt-6 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="text-white bg-[#588292] hover:opacity-80 px-3 py-1 rounded disabled:opacity-50"
            >
              &lt;&lt; Previous
            </button>
            <span className="text-white/80">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
              className="text-white bg-[#588292] hover:opacity-80 px-3 py-1 rounded disabled:opacity-50"
            >
              Next &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendcal;
