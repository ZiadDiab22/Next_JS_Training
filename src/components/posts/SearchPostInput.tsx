"use client";

import React, { useState } from 'react'

const SearchPostInput = () => {
  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => { //e is a object of event that produced by sending form
    console.log({ searchText });
  }

  return (
    <form onSubmit={formSubmitHandler} className='my-5 w-full md:w-2/3 m-auto' style={{ padding: '2rem' }}>
      <input className='w-full p-3 rounded text-xl border-none text-gray-900'
        type="search" placeholder='Search for Post' style={{ margin: '.5rem' }}
        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      {/* e reffers to Event Object , target reffers to current Element */}
    </form>
  )
}

export default SearchPostInput