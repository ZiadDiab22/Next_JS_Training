import React from 'react'
import Link from 'next/link'
// import { Post } from '@/utils/types'
import { Post } from '@/generated/prisma';
import SearchPostInput from '@/components/posts/SearchPostInput';
import Pagination from '@/components/posts/pagination';
import { getPosts } from '@/ApiCalls/PostApiCall';
import prisma from '@/utils/db';

interface PostPageProps {
  searchParams: { pageNumber: string }
}

const info = async ({ searchParams }: PostPageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 1));

  const { pageNumber } = searchParams;
  const data: Post[] = await getPosts(pageNumber)
  const count: number = await prisma.post.count()
  const pages = Math.ceil(count / 6)

  return (
    <section className='flex flex-col items-center justify-center fix-height p-8' style={{ padding: '2rem' }}>
      <SearchPostInput />
      <div className='flex items-center justify-center flex-wrap gap-7 mb-4'>
        {data.map(item => (
          <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4" key={item.id}>
            <h3 className='text-xl font-bold text-gray-900 line-clamp-1'>{item.title}</h3>
            <p className='my-2 text-xl text-gray-700 p-1 line-clamp-1'>{item.desc}</p>
            <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/info/${item.id}`}>
              Read More
            </Link>
          </div>
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route='/info' pages={pages} />
    </section>
  )
}

export default info