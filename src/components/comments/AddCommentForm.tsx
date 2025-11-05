"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { IoSend } from "react-icons/io5";

interface AddCommentFormProps {
  postId: number
}

const AddCommentForm = ({ postId }: AddCommentFormProps) => {
  const router = useRouter()
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => { //e is a object of event that produced by sending form
    e.preventDefault() //prevent the browser from reloading the page
    if (text === "") return toast.error("Write Something!")

    try {
      await axios.post(`http://localhost:3000/api/comments`, { text, postId })
      router.refresh()
      setText("")
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={formSubmitHandler} style={{ padding: '2rem' }}>
      <div className='flex flex-col'>
        <input className='mb-4 border rounded p-2 text-xl' type="text" placeholder='Enter your Comment'
          value={text} onChange={(e) => setText(e.target.value)} />
        {/* e reffers to Event Object , target reffers to current Element */}
        <button type='submit' className=' text-white bg-blue-800 rounded-lg font-bold w-min hover:cursor-pointer hover:scale-110 transition duration-300' style={{ padding: '0.6rem', marginTop: '1rem' }}>
          <IoSend />
        </button>
      </div>
    </form>
  )
}

export default AddCommentForm