import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { Post } from '@/generated/prisma'
import Link from 'next/link'
import { getPosts } from '@/ApiCalls/PostApiCall'
import Pagination from '@/components/posts/pagination';
import DeletePostButton from './DeletePostButton'
import prisma from '@/utils/db'

interface AdminPostsTableProps {
  searchParams: { pageNumber: string }
}

const AdminPostsTable = async ({ searchParams: { pageNumber } }: AdminPostsTableProps) => {
  const token = (await cookies()).get("jwtToken")?.value
  if (!token) redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) redirect("/")

  const data: Post[] = await getPosts(pageNumber)
  const count: number = await prisma.post.count()
  const pages = Math.ceil(count / 6)

  return (
    <section className='p-5'>
      <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Posts</h1>
      <table className='table w-full text-left'>
        <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
          <tr><th className='p-1 lg:p-2'>Title</th>
            <th className='hidden lg:inline-block'>Created at</th>
            <th>Actions</th>
            <th className='hidden lg:inline-block'></th>
          </tr>
        </thead>
        <tbody>
          {data.map(post => (
            <tr key={post.id} className='border-b border-t border-gray-300'>
              <td className='p-3 text-gray-700'>{post.title}</td>
              <td className='hidden lg:inline-block text-gray-700 font-normal p-3'>
                {new Date(post.createdAt).toDateString()}</td>
              <td className='p-3'>
                <Link href={`/admin/posts-table/edit/${post.id}`}
                  className='bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition'>
                  Edit</Link>
                <DeletePostButton postId={post.id} />
              </td>
              <td className='hidden lg:inline-block p-3'>
                <Link href={`/info/${post.id}`} className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'>
                  Read More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageNumber={parseInt(pageNumber)} route='/admin/posts-table' pages={pages} />
    </section>
  )
}

export default AdminPostsTable