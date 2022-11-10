import React from 'react'

export default function Input({ type, placeholder, ...rest }) {
  return (
    <input
      className='max-w-xl w-11/12 h-10 rounded px-3 text-base items-center outline-none'
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  )
}
