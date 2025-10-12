"use client";

import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddCommentForm = () => {
  const [text, setText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => { //e is a object of event that produced by sending form
    e.preventDefault() //prevent the browser from reloading the page
    if (text === "") return toast.error("Write Something!")

    console.log({ text });
  }

  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col' style={{ padding: '2rem' }}>
      <input className='mb-4 border rounded p-2 text-xl' type="text" placeholder='Enter your Comment' style={{ margin: '.5rem', padding: '1rem' }}
        value={text} onChange={(e) => setText(e.target.value)} />
      {/* e reffers to Event Object , target reffers to current Element */}
      <button type='submit' className=' text-white bg-blue-800 rounded-lg font-bold w-min' style={{ padding: '0.6rem', marginTop: '1rem', marginLeft:"45%" }}>
        Comment
      </button>
    </form>
  )
}

export default AddCommentForm