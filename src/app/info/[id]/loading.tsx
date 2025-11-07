import React from 'react'

const SinglePostLoadingPage = () => {
  return (
    <section className="fix-height container w-full px-5 pt-8 animate-pulse m-auto">
      <div className="bg-white rounded-lg p-7">
        <h1 className="bg-gray-300 mb-2 h-6 rounded-lg"></h1>
        <div className="bg-gray-300 mt-4"></div>
        <p className="bg-gray-300 mt-5 h-6 rounded-lg"></p>
      </div>
      <div className="mt-7">
        <div className='p-2 rounded-lg bg-gray-300 h-10'></div>
        <button className='bg-gray-300 mt-2 p-1 rounded-lg h-8 w-20'></button>
      </div>
    </section>
  )
}

export default SinglePostLoadingPage