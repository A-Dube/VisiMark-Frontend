import React from 'react'
import Header from '../NavBar/Header'

const Notice = () => {

  const notices = [
  {
    id: 1,
    date: "16 Oct '24",
    text: "Half Day has been declared on account of last working day before Diwali break for the whole staff on 17th Oct 2024.",
  },
  {
    id: 2,
    date: "9 Oct '24",
    text: "Mandatory meeting of HR Dept. on 11 Oct 2024, any absenteeism will result in strict action.",
  },
  {
    id: 3,
    date: "21 Sept '24",
    text: "Holiday has been declared on 25 Sept 2024 because of site inspection in factory.",
  },
];

  return (
    <div className="max-w-full max-h-full">
      <Header />
      <section className="relative rounded-lg shadow-md pt-[200px] min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('src/assets/HDBG.png')] bg-cover bg-center bg-no-repeat opacity-50 backdrop-blur-[20px] backdrop-filter -z-20"></div>
        <div className="absolute inset-0 bg-[#032636] opacity-95 -z-10"></div>
        <div className="relative bg-[#134558] p-10 rounded-xl shadow-2xl w-[600px]">
          <h2 className="text-3xl text-[#F0F6DF] font-semibold text-center mb-8 tracking-wide">
            NOTICE BOARD
          </h2>
          <div className="bg-[#AEC3B1] p-10 rounded-lg flex flex-col gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-[#F0F6DF] shadow-md p-4 rounded-md relative border border-gray-200 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute -top-8 left-60"><img src="src\assets\Icons\VectorN.png" alt="vectorn" className=""/></div>
                <p className="text-sm text-gray-700">{notice.text}</p>
                <p className="text-xs text-right text-gray-500 mt-2">
                  {notice.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Notice
