import React from 'react'

import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export default function Header() {

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className='w-full max-w-2xl mt-4'>
      <nav className='w-full bg-white h-12 flex justify-between items-center rounded'>
        <div className='flex justify-start px-3'>
          <button
            onClick={handleLogout}
            className='bg-transparent'
          >
            <BiLogOut size={28} color='#db2629' />
          </button>
        </div>

        <div className='flex flex-auto justify-end gap-10 items-center pr-3'>

          <Link
            className='text-slate-800 hover:text-yellow-500 transition'
            to='/'
          >
            Início
          </Link>

          <Link
            className='text-slate-800 hover:text-yellow-500 transition'
            to='/admin'
          >
            Links
          </Link>
          <Link
            className='text-slate-800 hover:text-yellow-500 transition mr-3'
            to='/profile'
          >
            Perfil
          </Link>
        </div>

      </nav>
    </header>
  )
}
