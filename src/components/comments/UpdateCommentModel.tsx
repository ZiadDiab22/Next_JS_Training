"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify'

interface UpdateCommentModelProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModel = ({ setOpen, text, commentId }: UpdateCommentModelProps) => {
  const [updatedText, SetUpdatedText] = useState(text);
  const router = useRouter()

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (updatedText === "") return toast.info("please write something")
    try {
      await axios.put(`http://localhost:3000/api/comments/${commentId}`, { text: updatedText })
      router.refresh()
      SetUpdatedText("")
      setOpen(false)
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/70 flex items-center justify-center'>
      <div className='w-2/4 bg-white rounded-lg p-3'>
        <div className='flex justify-end items-start mb-5'>
          <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-red-500 cursor-pointer text-3xl' />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input type="text" placeholder='Edit Comment' value={updatedText} onChange={(e) => SetUpdatedText(e.target.value)}
            className='text-xl rounded-lg p-2 w-full bg-white mb-2 border border-black' />
          <button type='submit' className='bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition'>
            Edit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCommentModel