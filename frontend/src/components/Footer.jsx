import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          Prescripto – Empowering your health journey.
          Find trusted doctors, book appointments, and get expert care — all in one place.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to="/" onClick={scrollToTop} className="hover:underline">Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop} className="hover:underline">About us</Link></li>
            <li><Link to="/contact" onClick={scrollToTop} className="hover:underline">Contact</Link></li>
            <li><Link to="/privacy-policy" onClick={scrollToTop} className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>07172-25463-4533</li>
            <li>contact@prescripto.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © 2024 Prescripto.com — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
