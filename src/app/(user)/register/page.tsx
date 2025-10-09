import React from 'react'
import RegisterForm from './RegisterForm'

const register = () => {
  return (
    <section className='fix-height flex items-center justify-center'>
      <div className='m-auto bg-white rounded-lg p-5 w-full md:w-2/3' style={{ padding: '2rem' }}>
        <h1 className='text-3xl font-bold text-gray-800 mb-5 flex justify-center' style={{ padding: '.5rem' }}>Create New Account</h1>
        <RegisterForm />
      </div>
    </section>
  )
}

export default register