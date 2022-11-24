import React, { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar'

import { storage } from '../../services/firebaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function ImgPerfil() {

  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(null);


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    const imgRef = ref(storage, "image");
    uploadBytes(imgRef, img)
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {
            setUrl(url)
          })
          .catch((error) => {
            console.log('Erro ao efetuar download da URL ', error.message);
          })
        setImg(null)
      })
      .catch((error) => {
        console.log('Erro upload imagem ', error.message);
      })
  }

  useEffect(() => {

    function loadImg() {
      const imgRef = ref(storage, 'image')

      getDownloadURL(imgRef)
        .then((url) => {
          setUrl(url)
        })
        .catch((error) => {
          console.log('Erro ao obter a URL da foto de perfil do usuário ', error.message);
        })
    }

    loadImg()

  }, [])

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-full'>
      <Avatar
        alt="Remy Sharp"
        src={url}
        sx={{ width: 150, height: 150 }}
      />
      <input
        type="file"
        onChange={handleImageChange}
        className='flex items-center w-auto text-sm text-slate-400
        file:mr-4 file:py-2 file:px-4
        file:rounded file:cursor-pointer file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100'
      />

      <button
        className='w-full max-w-xl h-10 rounded bg-blue-600 hover:bg-blue-400 transition text-white text-lg'
        onClick={handleSubmit}
      >
        Salvar
      </button>

    </div>

  )
}
