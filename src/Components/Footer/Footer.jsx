import React from 'react'
import Logo from '../../assets/maui3.png'
import { Link } from 'react-router-dom'
export default function Footer() {
  return <>
      

<footer className=" shadow bg-[#afcbff] mt-1">
  <div className="w-full max-w-screen-xl mx-auto p-4 py-2md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link to={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <img src={Logo} className="w-32" alt="Maui logo" />
      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li>
          <span className="hover:underline me-4 text-[#0e1c36] md:me-6">About</span>
        </li>
        <li>
          <span className="hover:underline text-[#0e1c36] me-4 md:me-6">Privacy Policy</span>
        </li>
        <li>
          <span className="hover:underline text-[#0e1c36] me-4 md:me-6">Licensing</span>
        </li>
        <li>
          <span className="hover:underline text-[#0e1c36]">Contact</span>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-[#0e1c36] sm:text-center">© 2025 <span className="hover:underline text-[#0e1c36]">yousef samir™</span>. All Rights Reserved.</span>
  </div>
</footer>



    </>
  
}
