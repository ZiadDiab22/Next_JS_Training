"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const SearchPostInput = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => { //e is a object of event that produced by sending form
    e.preventDefault();
    console.log({ searchText });
    router.push(`/info/search?searchText=${searchText}`);
  }

  return (
    <form onSubmit={formSubmitHandler} className='w-full md:w-2/3 m-auto' style={{ padding: '2rem' }}>
      <input className='w-full p-3 rounded text-xl border-none text-gray-900'
        type="search" placeholder='Search for Post' style={{ margin: '.5rem' }}
        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      {/* e reffers to Event Object , target reffers to current Element */}
    </form>
  )
}

export default SearchPostInput