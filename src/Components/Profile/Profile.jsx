import React, { useContext, useEffect, useState } from 'react'
import { AdressContext } from '../../Context/AddressContext'
import Adress from '../Adress/Adress';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/UserContext';
import { EmailContext } from '../../Context/EmailContext';
import UserData from '../UserData/UserData';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import { UpdatePasswordContext } from '../../Context/UpdatePasswordContext';

export default function Profile() {
const{data, isLoading, isError ,isEditing, setIsEditing ,deleteAdress}=useContext(AdressContext)
const { userName } = useContext(Usercontext);
const{updateForm, setUpdateForm}=useContext(EmailContext)
const{passForm, setPassForm}=useContext(UpdatePasswordContext)
const navigate=useNavigate();


  return <>
  {isEditing&&<Adress/>}
  {updateForm&&<UserData/>}
  {passForm && <UpdatePassword/>}
  <section className="bg-white py-8 antialiased mb-40  md:py-8">
  <div className="mx-auto w-10/12 px-4 2xl:px-0">
    <h2 className="mb-4 text-2xl font-semibold text-[#4F46E5]  sm:text-3xl md:mb-6">Account Overview</h2>
    <div className="py-4 md:py-8">
      <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
      <div  className="space-y-3 flex flex-col items-start bg-[#d7f9ff] p-6 rounded-lg">
          <h2 className='text-3xl font-bold text-[#726EEB] text-center'>Main Details</h2>
           <h2 className="flex items-start text-xl  leading-none text-gray-900  sm:text-2xl"></h2>
            <dl className=''>
            <dt className="font-semibold text-xl text-[#0e1c36] text-start">Name: <span className='text-[#0e1c36] font-medium'>{userName}</span></dt>
          </dl>
        <div className=''>
        <button type="button" onClick={()=>setUpdateForm(true)} className=" m-1 w-full items-center justify-center rounded-lg bg-[#4F46E5]  px-5 py-2.5 text-sm font-medium text-white hover:bg-[#726EEB] sm:w-auto">
          Update your data
        </button>
        <button type="button" onClick={()=>setPassForm(true)} className=" m-1 w-full items-center justify-center rounded-lg bg-[#4F46E5]  px-5 py-2.5 text-sm font-medium text-white hover:bg-[#726EEB] sm:w-auto">
          Update your Password
        </button>
        </div>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////////// */}


        {data?.data.length < 1 ? <div className='flex items-center justify-center bg-gray-100 text-3xl rounded-lg'>No Address Added Yet</div> :data?.data.map((address)=><div key={address._id} className="space-y-3 flex flex-col items-start bg-gray-100 p-6 rounded-lg">
          <h2 className='text-2xl font-bold text-[#726EEB]'>Address Saved</h2>
           <h2 className="flex items-start text-xl  leading-none text-gray-900  sm:text-2xl">{address.name}</h2>
            <dl className=''>
            <dt className="font-semibold text-gray-900 text-start">Details</dt>
            <dd className="text-gray-500 ">{address.details}</dd>
          </dl>
          <dl>
            <dt className="font-semibold text-gray-900 text-start ">City</dt>
            <dd className="flex items-center gap-1 text-gray-500 text-start ">
              {address.city}
            </dd>
          </dl>
          <dl>
            <dt className="font-semibold text-gray-900 text-start">Phone Number</dt>
            <dd className="flex items-center gap-1 text-gray-500 text-start ">
              {address.phone}
            </dd>
          </dl>
        <div className=''>
          <button type="button" onClick={()=>deleteAdress(address._id)} className=" m-1 w-full items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-500 sm:w-auto">
          Delete this address
        </button>
        <button onClick={() => navigate('/checkout', {state: {details: address.details, city: address.city, phone: address.phone,},})}  type="button" className=" m-1 w-full items-center justify-center rounded-lg bg-[#4F46E5]  px-5 py-2.5 text-sm font-medium text-white hover:bg-[#726EEB] sm:w-auto">
          Use this address
        </button>
        </div>
        </div>)}
      </div>   
      <button type="button" onClick={()=>setIsEditing(true)} className=" m-1 w-full items-center justify-center rounded-lg bg-[#4F46E5]  px-5 py-2.5 text-sm font-medium text-white hover:bg-[#726EEB] sm:w-auto">
          Add new address
        </button>
    </div>
  </div>
    </section>
    </>
}
