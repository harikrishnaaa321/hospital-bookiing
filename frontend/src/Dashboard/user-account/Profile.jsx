import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../components/utils/uploadCloudinary";


import { BASE_URL,token } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Profile = ({user}) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType:""
  });

useEffect(()=>{
setFormData({name:user.name,email:user.email,photo:user.photo,gender:user.gender,bloodType:user.bloodType})
},[user])
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      toast.error('Error uploading file');
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'updation failed');
      }
      toast.success(result.message);
      navigate('/users/profile/me');
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-3 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-3 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-3 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
            
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-3 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
            required
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Avatar"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
           {selectedFile?selectedFile.name:'upload photo'}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={35} color='#ffffff' /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
