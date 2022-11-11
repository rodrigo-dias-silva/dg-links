import React from 'react'
import { MdAddLink } from 'react-icons/md';

export function Button({ text }, props) {
  return (
    <button
      className='w-full max-w-xl h-10 rounded bg-blue-600 hover:bg-blue-400 transition text-white text-lg'
      {...props}
    >
      {text}
    </button>
  )
}

export function ButtonLink({ text }, props) {
  return (
    <button
      className='w-full max-w-xl h-10 rounded bg-blue-600 hover:bg-blue-400 transition text-white text-lg flex items-center justify-center gap-2'
      {...props}
    >
      {text}<MdAddLink size={24} color='#fff' />
    </button>
  )
}
