"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface DeleteCommentButtonProps {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
  const router = useRouter()

  const deleteCommentHandler = async () => {
    try {
      if (window.confirm('you going to delete this comment, are you sure?')) {
        await axios.delete(`http://localhost:3000/api/comments/${commentId}`)
        router.refresh()
        toast.success("Comment Deleted")
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div onClick={deleteCommentHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
      Delete
    </div>
  )
}

export default DeleteCommentButton