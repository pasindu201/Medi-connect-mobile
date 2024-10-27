import React from 'react';

const DoctorContainer = ({ doctorData }) => {
  return (
    <div>
      <div className='text-gray-700 p-2 text-2xl'>Doctors</div>
      <div>
        <div className="mt-6">
          {doctorData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-2 cursor-default"
            >
              <div className={`border border-black flex rounded-md flex-col items-center justify-center ${index === 0 ? 'bg-blue-400' : ''}`}>
                <div className='text-lg'>Dr. {item.name}</div>
                <div className={`text-sm ${index === 0 ? 'text-white' : 'text-blue-400'}`}>Doctor ID: {item.doctor_id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorContainer;
