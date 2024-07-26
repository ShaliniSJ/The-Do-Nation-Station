import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex items-center transition ease-out backdrop-blur-sm bg-primary text-text-light shadow-md">
      <a href="#">The Do-Nation Station</a>
      <ul className="list-none ml-auto hidden md:flex">
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">About</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">Leader Board</a></li>
        <li className="ml-5"><a href="#" className="hover:underline focus:underline">Past Donations</a></li>
      </ul>
      <div className='mx-2'>
        <button className="bg-blue rounded-full 
          shadow-[rgba(144,223,245,.2)_0_-25px_18px_-14px_inset,rgba(144,223,245,.15)_0_1px_2px,rgba(144,223,245,.15)_0_2px_4px,rgba(144,223,245,.15)_0_4px_8px,rgba(144,223,245,.15)_0_8px_16px,rgba(144,223,245,.15)_0_16px_32px]
          text-gray-200 cursor-pointer
          inline-block font-sans
          py-1.5 px-5
          text-center text-base
          transition-all duration-250
          border-0
          select-none
          hover:shadow-[rgba(47,91,253,.35)_0_-25px_18px_-14px_inset,rgba(47,91,253,.25)_0_1px_2px,rgba(47,91,253,.25)_0_2px_4px,rgba(47,91,253,.25)_0_4px_8px,rgba(47,91,253,.25)_0_8px_16px,rgba(47,91,253,.25)_0_16px_32px]
          hover:scale-105 hover:rotate-[-1deg] ">
          Login
        </button>
      </div>
      <button className="ml-auto md:ml-5 inline-block p-0 text-0 bg-none border-none filter drop-shadow-md">
        <span className="sr-only">Search</span>
        <IoSearchSharp className="text-text-light w-6 h-6" />
      </button>
    </nav>
  );
}

export default Navbar;
