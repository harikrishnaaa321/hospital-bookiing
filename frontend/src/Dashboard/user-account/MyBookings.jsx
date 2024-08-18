import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import DoctorCard from './../../components/doctors/DoctorCard';
import Error from '../../components/Error/Error';
import Loading from '../../components/loader/Loading';

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div>
      {appointments && appointments.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {appointments.map(doctor => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      ) : (
        <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>
          You did not book any doctor yet
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
