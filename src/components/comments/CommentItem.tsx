"use client";
import { CommentWithUser } from "@/utils/types"
import { FaEdit, FaTrash } from "react-icons/fa"
import UpdateCommentModel from "./UpdateCommentModel";
import { useState } from "react";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">{new Date(comment.createdAt).toDateString()}</span>
      </div>
      <p className="text-gray-800 mb-2">
        {comment.text}
      </p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit onClick={() => setOpen(true)} className='text-gray-600 text-xl cursor-pointer me-2' />
          <FaTrash className='text-red-600 text-xl cursor-pointer' />
        </div>
      )}
      {open && <UpdateCommentModel setOpen={setOpen} text={comment.text} commentId={comment.id} />}
    </div>
  )
}

export default CommentItem