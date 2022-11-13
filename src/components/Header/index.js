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
        <div className='flex justify-start px-3 flex-1'>
          <button
            onClick={handleLogout}
            className='bg-transparent'
          >
            <BiLogOut size={28} color='#db2629' />
          </button>
        </div>

        <div className='flex flex-1 justify-evenly items-center'>

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
        </div>

      </nav>
    </header>
  )
}
