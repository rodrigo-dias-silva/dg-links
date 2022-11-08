import React from 'react'
import { Link } from 'react-router-dom'

import img from '../../assets/404.gif'


export default function Error() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-5 sm:px-0'>
      <img src={img} alt='404' className='mb-10 w-52 sm:w-80' />

      <div className='flex items-center flex-col text-center'>
        <h1 className='text-white text-3xl font-semibold mb-4 sm:text-4xl'>
          Página não encontrada!
        </h1>

        <span className='text-white text-sm'>
          Algo deu errado, não encontrei o que você procura...
        </span>

        <Link to={'/'} className='mt-8 bg-zinc-300 px-4 py-1 rounded-lg hover:bg-white transition' >
          Voltar para a home
        </Link>
      </div>

    </div>
  )
}
