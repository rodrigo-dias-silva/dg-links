import React, { useEffect, useState } from 'react'

import { getDocs, collection, orderBy, query } from 'firebase/firestore'

import { db } from '../../services/firebaseConnection'

import img from '../../assets/404.gif'
import Header from './../../components/Header/index';
import Logo from './../../components/Logo/index';

export default function Home() {

  const [links, setLinks] = useState([])

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, 'links')
      const queryRef = query(linksRef, orderBy('created', 'asc'))

      getDocs(queryRef)
        .then((snapshot) => {
          let list = []

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color
            })
          })

          setLinks(list)
        })
    }

    loadLinks()

  }, [])

  return (
    <div className='scrollbar-hide min-h-screen'>

      <div className='w-full flex-1 flex justify-center items-center px-4'>
        <Header />
      </div>

      <div className='mt-20 w-full min-h-[600px] md:h-3/4 flex flex-1 flex-col  items-center gap-5'>

        <img src={img} alt='foto da pessoa' className='w-40 h-40  rounded-full border-2 border-white bg-center shadow-md' />

        <h1 className='text-white text-2xl'>@digle.silva</h1>

        <span className='text-slate-400 mt-3'>Meus links</span>

        <main className='flex flex-col max-w-xl w-10/12 gap-5 text-center'>

          {links.map((item) => (

            <section
              key={item.id}
              style={{ backgroundColor: item.bg }}
              className='flex justify-center items-center w-full rounded py-2 hover:scale-105 transition'>
              <a href={item.url} target='blank' className='w-full'>
                <span style={{ color: item.color }} className='text-lg'>{item.name}</span>
              </a>
            </section>

          ))}

        </main>
      </div>

      <footer className='mt-12'>
        <div className='flex justify-center items-center'>
          <Logo />
        </div>
      </footer>

    </div>
  )
}
