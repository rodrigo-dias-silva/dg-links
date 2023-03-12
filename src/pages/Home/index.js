import React, { useEffect, useState } from 'react'

import {
  getDocs,
  collection,
  orderBy,
  query,
  getDoc,
  doc
} from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

import { db, storage } from '../../services/firebaseConnection'
import Logo from './../../components/Logo/index';
import { Avatar } from '@mui/material';

export default function Home() {

  const [links, setLinks] = useState([])
  const [imgUrl, setImgUrl] = useState(null)
  const [nameProf, setNameProf] = useState('Bem vindo!')

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

    function loadName() {
      const docRef = doc(db, 'profile', 'name')
      getDoc(docRef)
        .then((snapshot) => {

          if (snapshot.data() !== undefined) {
            setNameProf(snapshot.data().profilename)
          }
        })
    }

    loadName()

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
    <div className='min-h-screen'>

      <div className='w-full md:min-h-[600px] md:h-3/4 flex flex-1 flex-col  items-center gap-5'>

        <div className='md:mt-10 mt-5'>
          <Avatar
            alt="Foto de perfil do usuário"
            src={imgUrl}
            sx={{ width: 160, height: 160 }}
          />
        </div>

        <h1 className='text-white text-2xl'>{nameProf}</h1>

        <span className='text-slate-400 mt-3'>Meus links</span>

        <main className='flex flex-col max-w-xl w-10/12 gap-5 text-center'>

          {links.map((item) => (

            <section
              key={item.id}
              style={{ backgroundColor: item.bg }}
              className='flex justify-center items-center w-full rounded-full py-2 hover:scale-105 transition'
            >
              <a href={item.url}
                target='blank'
                className='w-full'
              >
                <span
                  style={{ color: item.color }}
                  className='text-lg'
                >
                  {item.name}
                </span>
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
