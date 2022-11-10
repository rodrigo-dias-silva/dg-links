import React from 'react'

export default function Button({ type, text, ...rest }) {
  return (
    <button
      className='w-11/12 max-w-xl h-10 rounded bg-blue-600 hover:bg-blue-400 transition text-white text-lg'
      type={type}
      {...rest}
    >
      {text}
    </button>
  )
}
