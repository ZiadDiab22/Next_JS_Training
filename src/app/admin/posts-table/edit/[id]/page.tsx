import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { Post } from '@/generated/prisma';
import { getSinglePost } from '@/ApiCalls/PostApiCall';
import EditPostForm from './EditPostForm';

interface EditPostPageProps {
  params: { id: string };
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const token = (await cookies()).get("jwtToken")?.value
  if (!token) redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) redirect("/")

  const post: Post = await getSinglePost(params.id);

  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
      <div className='shadow p-4 bg-purple-200 rounded w-full'>
        <h2 className='text-2xl text-green-700 font-semibold mb-4'>
          Edit Post
        </h2>
        <EditPostForm post={post} />
      </div>
    </section>
  )
}

export default EditPostPage