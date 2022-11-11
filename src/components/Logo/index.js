import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to={'/'} className='p-12'>
      <h1 className='text-white text-6xl font-bold'>
        Dg<span className='text-transparent bg-gradient-to-b from-cyan-500 to-emerald-200 bg-clip-text font-semibold'>Links</span>
      </h1>
    </Link>
  )
}
