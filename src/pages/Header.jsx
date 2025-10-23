import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

function Header() {

 
  return (
    <div className="pt-16 items-center ">
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
    
      <ul className="hidden md:flex text-[#515151] mt-5 items-center gap-5 font-medium">
        <li>
          <NavLink to='/' className={({isActive})=>`flex items-center gap-3  py-3.5 px-3 md:px-9 md:min-w-50 cursor-pointer text-gray-600 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} >Home</NavLink>
        </li>
        <li>
          <NavLink to='/parents_info' className={({isActive})=>`flex items-center gap-3  py-3.5 px-3 md:px-9 md:min-w-50 cursor-pointer text-gray-600 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`}>Parents</NavLink>
        </li>
        <li>
          <NavLink to='/children_info' className={({isActive})=>`flex items-center gap-3  py-3.5 px-3 md:px-9 md:min-w-50 cursor-pointer text-gray-600 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`}>Children</NavLink>
        </li>
        <li>
          <NavLink to='/add_info' className={({isActive})=>`flex items-center gap-3  py-3.5 px-3 md:px-9 md:min-w-50 cursor-pointer text-gray-600 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`}>Add User</NavLink>
        </li>
      </ul>

    </nav>
    </div>
  );
}

export default Header;
