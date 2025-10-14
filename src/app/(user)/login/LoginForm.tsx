"use client";

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => { //e is a object of event that produced by sending form
    e.preventDefault() //prevent the browser from reloading the page
    if (email === "") return toast.error("Email is required")
    if (password === "") return toast.error("Password is required")
    console.log({ email, password });

    router.replace('/');
    //we use 'push' method or 'replace' method , (push) if we want to return to previous link because it push a link in stack 
  }

  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col' style={{ padding: '2rem' }}>
      <input className='mb-4 border rounded p-2 text-xl' type="email" placeholder='Enter your Email' style={{ margin: '.5rem' }}
        value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* e reffers to Event Object , target reffers to current Element */}
      <input className='mb-4 border rounded p-2 text-xl' type="password" placeholder='Enter your Password' style={{ margin: '.5rem' }}
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold cursor-pointer'>
        Login
      </button>
    </form>
  )
}

export default LoginForm