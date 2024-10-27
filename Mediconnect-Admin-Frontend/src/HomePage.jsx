import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { DoctorIcon, Patient } from './Icons/icon.js';
import axios from 'axios';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [hospitalSearchTerm, setHospitalSearchTerm] = useState('');
  const [patients_count, setPatientsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsResponse, hospitalsResponse, patient_count] = await Promise.all([
          fetchDoctors(),
          fetchHospitals(),
          fetchNumerOfPatients(),
        ]);
        setDoctors(doctorsResponse.data); 
        setHospitals(hospitalsResponse.data); 
        setPatientsCount(patient_count);
      } catch (err) {
        setError('Failed to fetch data'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const fetchDoctors = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/doctors/");
    return response.data; 
  };

  const fetchHospitals = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/hospitals/");
    return response.data;
  };

  const fetchNumerOfPatients = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/patient/count/");
    return response.data.patients_count;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.First_name || ''} ${doctor.Last_name || ''}`.toLowerCase();
    return fullName.includes(doctorSearchTerm.toLowerCase());
  });
  
  const filteredHospitals = hospitals.filter((hospital) => {
    const hospitalName = hospital.Name.toLowerCase();
    return hospitalName.includes(hospitalSearchTerm.toLowerCase());
  });

  const renderRating = (val) => (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={val} precision={0.1} readOnly />
    </Stack>
  );

  return (
    <div>
      <header className='text-2xl font-bold mb-4'>Dashboard Overview</header>
      <div className='flex font-sans mb-4'>
        <div className='flex mr-8'>
          <div>
            <Patient />
          </div>
          <div>
            <div className='font-semibold'>Total Patients</div>
            <div className='font-semibold'>{patients_count}</div>
          </div>
        </div>
        <div className='flex'>
          <div className='text-xl'>
            <DoctorIcon />
          </div>
          <div>
            <div className='font-semibold'>Total Doctors</div>
            <div className='font-semibold'>{doctors.length}</div>
          </div>
        </div>
      </div>

      {/* Manage Doctors Section */}
      <div className='space-y-8'>
        <div className='w-full'>
          <div className='mb-4 font-bold text-xl pt-10'>Manage Doctors</div>
          <div className='flex mb-4'>
            <div className='flex w-80 mx-auto'>
              <input
                type='text'
                placeholder='Search Doctor...'
                className='border px-4 py-2 w-full'
                value={doctorSearchTerm}
                onChange={(e) => setDoctorSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table for Doctors */}
          <div className='max-h-60 overflow-y-auto'>
            <table className='min-w-full bg-white border border-gray-300 table-fixed'>
              <thead>
                <tr>
                  <th className='border px-4 py-2 w-1/4'>Doctor ID</th>
                  <th className='border px-4 py-2 w-1/2'>Name</th>
                  <th className='border px-4 py-2 w-1/4'>Specialization</th>
                  <th className='border px-4 py-2 w-1/4'>Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={4} className='border px-4 py-2 text-center text-gray-500'>
                      No doctors found
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.Doctor_ID}>
                      <td className='border px-4 py-2'>{doctor.Doctor_ID}</td>
                      <td className='border px-4 py-2'>{doctor.Name}</td>
                      <td className='border px-4 py-2'>{doctor.Specialization}</td>
                      <td className='border px-4 py-2'>{renderRating(doctor.Rating)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manage Hospitals Section */}
        <div className='w-full'>
          <div className='mb-4 font-bold text-xl pt-10'>Manage Hospitals</div>
          <div className='flex mb-4'>
            <div className='flex w-80 mx-auto'>
              <input
                type='text'
                placeholder='Search Hospital...'
                className='border px-4 py-2 w-full'
                value={hospitalSearchTerm}
                onChange={(e) => setHospitalSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table for Hospitals */}
          <div className='max-h-60 overflow-y-auto'>
            <table className='min-w-full bg-white border border-gray-300 table-fixed'>
              <thead>
                <tr>
                  <th className='border px-4 py-2 w-1/4'>Hospital ID</th>
                  <th className='border px-4 py-2 w-1/2'>Name</th>
                  <th className='border px-4 py-2 w-1/4'>Location</th>
                  <th className='border px-4 py-2 w-1/4'>Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className='border px-4 py-2 text-center text-gray-500'>
                      No hospitals found
                    </td>
                  </tr>
                ) : (
                  filteredHospitals.slice(0, 5).map((hospital) => (
                    <tr key={hospital.id}>
                      <td className='border px-4 py-2'>{hospital.Hospital_ID}</td>
                      <td className='border px-4 py-2'>{hospital.Name}</td>
                      <td className='border px-4 py-2'>{hospital.Location}</td>
                      <td className='border px-4 py-2'>{renderRating(hospital.Rating)}</td>
                    </tr>
                  ))
                )}
                {filteredHospitals.length > 5 && (
                  <tr>
                    <td colSpan={4} className='border px-4 py-2 text-center text-gray-500'>
                      Showing {filteredHospitals.length} hospitals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
