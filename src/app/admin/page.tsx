import React from 'react'
import AddPostForm from './AddPostForm'

const AdminPage = () => {
  return (
    <div className='fix-height flex items-center justify-center px-5 lg:px-20' style={{ padding: '2.5rem' }}>
      <div className='shadow p-4 bg-purple-200 rounded w-full' style={{ padding: '2.5rem' }}>
        <h2 className='text-xl lg:text-2xl text-gray-700 font-semibold mb-4' style={{ padding: '.5rem' }}>
          Add New Post
        </h2>
        < AddPostForm />
      </div>
    </div >
  )
}

export default AdminPage