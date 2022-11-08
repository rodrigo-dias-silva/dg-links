import React from 'react'

import img from '../../assets/404.gif'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-4 gap-6'>
      <img src={img} alt='foto da pessoa' className='w-40 h-40  rounded-full border-2 border-white bg-center shadow-md' />
      <h1 className='text-white text-2xl'>@digle.silva</h1>
      <span className='text-slate-400'>Meus links</span>

      <main className='flex flex-col max-w-xl w-10/12 gap-5 text-center'>
        <section className='bg-white hover:bg-red-600 hover:text-white w-full rounded py-2 hover:scale-105 transition'>
          <a href='#'>
            <span className='text-lg'>Canal do Youtube</span>
          </a>
        </section>
        <section className='bg-white w-full rounded py-2  hover:scale-105 transition hover:bg-black hover:text-white'>
          <a href='#'>
            <span className='text-lg'>Tik Tok</span>
          </a>
        </section>
        <section className='bg-white w-full hover:bg-indigo-500 hover:text-white rounded py-2 hover:scale-105 transition'>
          <a href='#'>
            <span className='text-lg'>Canal do Discord</span>
          </a>
        </section>
      </main>
    </div>
  )
}
