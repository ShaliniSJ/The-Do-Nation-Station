// src/components/Navbar.jsx
import React from 'react';
import Image from 'next/image';
import { IoSearchSharp } from 'react-icons/io5';
import transparentLogo from '../assets/logo-white-transparent.png';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex items-center transition ease-out backdrop-blur-sm brightness-125 text-white text-sm md:text-base mask-mask mt-0"> {/* Add mt-4 for margin-top */}
      <a href="#" className="hover:underline focus:underline">
        <Image 
          src={transparentLogo}
          alt="The Do-Nation Station" 
          width={500} 
          height={500} />
      </a>
      <ul className="list-none ml-auto hidden md:flex">
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">About</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">Leader Board</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">Past Donations</a></li>
        
      </ul>
      <div className='mx-2'>
      <button className="bg-[#c2fbd7] rounded-full 
         shadow-[rgba(44,187,99,.2)_0_-25px_18px_-14px_inset,rgba(44,187,99,.15)_0_1px_2px,rgba(44,187,99,.15)_0_2px_4px,rgba(44,187,99,.15)_0_4px_8px,rgba(44,187,99,.15)_0_8px_16px,rgba(44,187,99,.15)_0_16px_32px]
         text-green-600 cursor-pointer
         inline-block font-sans
         py-1.5 px-5
         text-center text-base
         transition-all duration-250
         border-0
         select-none
         hover:shadow-[rgba(44,187,99,.35)_0_-25px_18px_-14px_inset,rgba(44,187,99,.25)_0_1px_2px,rgba(44,187,99,.25)_0_2px_4px,rgba(44,187,99,.25)_0_4px_8px,rgba(44,187,99,.25)_0_8px_16px,rgba(44,187,99,.25)_0_16px_32px]
         hover:scale-105 hover:rotate-[-1deg]">
   Login
</button>
</div>
      <button className="ml-auto md:ml-5 inline-block p-0 text-0 bg-none border-none filter drop-shadow-md search">
        <span className="sr-only">Search</span>
        <IoSearchSharp className="text-white w-6 h-6" /> 
      </button>
    </nav>
  );
}

export default Navbar;

//<li className="ml-5"><a href="#" className="hover:underline focus:underline">Contact</a></li>



