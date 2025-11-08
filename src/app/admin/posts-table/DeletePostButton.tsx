"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface DeletePostButtonProps {
  postId: number;
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const router = useRouter()

  const deletePostHandler = async () => {
    try {
      if (window.confirm('you going to delete this post, are you sure?')) {
        await axios.delete(`http://localhost:3000/api/posts/${postId}`)
        router.refresh()
        toast.success("Post Deleted")
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div onClick={deletePostHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
      Delete
    </div>
  )
}

export default DeletePostButton