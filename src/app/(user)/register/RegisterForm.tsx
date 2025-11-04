"use client";

import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const RegisterForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "") return toast.error("Name is required")
    if (email === "") return toast.error("Email is required")
    if (password === "") return toast.error("Password is required")

    try {
      setLoading(true)
      await axios.post("http://localhost:3000/api/users/register", { email, password, username })
      router.replace('/')
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col' style={{ padding: '2rem' }}>
      <input className='mb-4 border rounded p-2 text-xl' type="text" placeholder='Enter your Name' style={{ margin: '.5rem' }}
        value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className='mb-4 border rounded p-2 text-xl' type="email" placeholder='Enter your Email' style={{ margin: '.5rem' }}
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='mb-4 border rounded p-2 text-xl' type="password" placeholder='Enter your Password' style={{ margin: '.5rem' }}
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold cursor-pointer'>
        {loading ? <LoadingSpinner /> : "Register"}
      </button>
    </form>
  )
}

export default RegisterForm