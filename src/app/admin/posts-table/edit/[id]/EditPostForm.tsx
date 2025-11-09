"use client";

import { Post } from '@/generated/prisma';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface EditPostFormProps {
  post: Post
}

const EditPostForm = ({ post }: EditPostFormProps) => {
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const router = useRouter();

  const formSubmitHandler = async (e: React.FormEvent) => { //e is a object of event that produced by sending form
    e.preventDefault() //prevent the browser from reloading the page
    if (title === "") return toast.error("Title is required")
    if (desc === "") return toast.error("Description is required")

    try {
      await axios.put(`http://localhost:3000/api/posts/${post.id}`, { title, desc })
      toast.success("Post Updated")
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col' style={{ padding: '2rem' }}>
      <input className='mb-4 border rounded p-2 text-xl' type="text" style={{ margin: '.5rem', width: 'full', background: 'white', border: "none" }}
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className='mb-4 p-2 lg:text-xl rounded resize-none' rows={5} style={{ marginTop: '2rem', width: 'full', background: 'white' }}
        value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
      <button type='submit' className='text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold' style={{ marginTop: '2rem' }}>
        Edit
      </button>
    </form>
  )
}

export default EditPostForm