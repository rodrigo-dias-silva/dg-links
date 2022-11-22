import React, { useEffect, useState } from 'react'

import { getDocs, collection, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

import { db, storage } from '../../services/firebaseConnection'
import Logo from './../../components/Logo/index';
import { Avatar } from '@mui/material';

export default function Home() {

  const [links, setLinks] = useState([])
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {

    function loadImg() {
      const imgRef = ref(storage, 'image')

      getDownloadURL(imgRef)
        .then((url) => {
          setImgUrl(url)
        })
        .catch((error) => {
          console.log('Erro ao obter a URL da foto de perfil do usuário ', error.message);
        })
    }

    loadImg()

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

      {/* <div className='w-full flex-1 flex justify-center items-center px-4'>
        <Header />
      </div> */}

      <div className='pt-32 w-full min-h-[600px] md:h-3/4 flex flex-1 flex-col  items-center gap-5'>

        <div>
          <Avatar
            alt="Foto de perfil do usuário"
            src={imgUrl}
            sx={{ width: 160, height: 160 }}
          />
        </div>

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

      <footer className='fixed bottom-0 left-1/2 right-1/2 mt-12'>
        <div className='flex justify-center items-center'>
          <Logo />
        </div>
      </footer>

    </div>
  )
}
