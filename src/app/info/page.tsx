import React from 'react'
import Link from 'next/link'
import { Post } from '@/utils/types'

const info = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" });
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 30 } });
  // update caching memory every 30 seconds

  if (!response.ok) {
    throw new Error("failed to fetch posts");
  }

  const data: Post[] = await response.json(); //transform json file to javascript object

  return (
    <section className='flex items-center justify-center flex-wrap fix-height' style={{ padding: '2rem' }}>
      <div className='flex items-center justify-center flex-wrap gap-9'>
        {data.map(item => (
          <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4" key={item.id}>
            <h3 className='text-xl font-bold text-gray-900 line-clamp-1'>{item.title}</h3>
            <p className='my-2 text-xl text-gray-700 p-1 line-clamp-1'>{item.body}</p>
            <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/info/${item.id}`}>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default info