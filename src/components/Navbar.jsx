import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Image from 'next/image';
import BlueLogo from '../assets/blue-image-logo.png';
import IconLogo from '../assets/apple-touch-icon.png';
import { useState } from 'react';

const Navbar = ({islogged}) => {
  
  return (
    <nav className="top-0 left-0 w-full p-4 md:p-6 flex items-center transition ease-out backdrop-blur-sm bg-primary text-text-light shadow-md">
      <a href="#">
      <Image 
      src={IconLogo} 
      alt="The Do-Nation Station Icon" width={43}/>
      </a>
      <a href="#">
      <Image 
      src={BlueLogo} 
      alt="The Do-Nation Station" width={250}/>
      </a>
      <ul className="list-none ml-auto hidden md:flex">
        <li className="ml-5"><a href="/" className="hover:underline focus:underline">Home</a></li>
        <li className="ml-5"><a href="/aboutUs" className="hover:underline focus:underline">About</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">Leaderboard</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">History</a></li>
      </ul>
      <div className='mx-5'>
        {islogged ? (<button className="bg-blue rounded-full 
          shadow-[rgba(144,223,245,.2)0-25px_18px_-14px_inset,rgba(144,223,245,.15)_0_1px_2px,rgba(144,223,245,.15)_0_2px_4px,rgba(144,223,245,.15)_0_4px_8px,rgba(144,223,245,.15)_0_8px_16px,rgba(144,223,245,.15)_0_16px_32px]
          text-gray-200 cursor-pointer
          inline-block font-sans
          py-1.5 px-5
          text-center text-base
          transition-all duration-250 
          border-0
          select-none
          hover:shadow-[rgba(47,91,253,.35)0-25px_18px_-14px_inset,rgba(47,91,253,.25)_0_1px_2px,rgba(47,91,253,.25)_0_2px_4px,rgba(47,91,253,.25)_0_4px_8px,rgba(47,91,253,.25)_0_8px_16px,rgba(47,91,253,.25)_0_16px_32px]
          hover:scale-105 hover:rotate-[-1deg] ">
          Profile
        </button>):

        (<a href="/signin">
          <button className="bg-blue rounded-full 
            shadow-[rgba(144,223,245,.2)0-25px_18px_-14px_inset,rgba(144,223,245,.15)_0_1px_2px,rgba(144,223,245,.15)_0_2px_4px,rgba(144,223,245,.15)_0_4px_8px,rgba(144,223,245,.15)_0_8px_16px,rgba(144,223,245,.15)_0_16px_32px]
            text-gray-200 cursor-pointer
            inline-block font-sans
            py-1.5 px-5
            text-center text-base
            transition-all duration-250 
            border-0
            select-none
            hover:shadow-[rgba(47,91,253,.35)0-25px_18px_-14px_inset,rgba(47,91,253,.25)_0_1px_2px,rgba(47,91,253,.25)_0_2px_4px,rgba(47,91,253,.25)_0_4px_8px,rgba(47,91,253,.25)_0_8px_16px,rgba(47,91,253,.25)_0_16px_32px]
            hover:scale-105 hover:rotate-[-1deg] ">
            Login
          </button>
          </a>)
}
      </div>
    </nav>
  );
}

export default Navbar;