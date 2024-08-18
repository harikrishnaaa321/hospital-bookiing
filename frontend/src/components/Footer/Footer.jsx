import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';

const Footer = () => {
  const year = new Date().getFullYear();

  // Define social media links and icons
  const socialLinks = [
    { path: 'https://linkedin.com', icon: <RiLinkedinFill className='text-blue-600' /> },
    { path: 'https://youtube.com', icon: <AiFillYoutube className='text-red-600' /> },
    { path: 'https://github.com', icon: <AiFillGithub className='text-gray-800' /> },
    { path: 'https://instagram.com', icon: <AiOutlineInstagram className='text-pink-500' /> },
  ];

  // Define quick links
  const quickLinks = [
    { path: '/about', display: 'About Us' },
    { path: '/services', display: 'Services' },
    { path: '/contact', display: 'Contact' },
    // Add more links as needed
  ];

  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src={logo} alt="Logo" />
            <p className='text-[16px] leading-9 font-[400] text-textColor'>
              Copyright {year} developed by Harikrishna
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => (
                <a href={link.path} target="_blank" rel="noopener noreferrer" key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Quick Links</h2>
            <ul>
              {quickLinks.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
