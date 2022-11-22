import React, { useState } from 'react'

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

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <Avatar
        alt="Remy Sharp"
        src={url}
        sx={{ width: 150, height: 150 }}
      />
      <input
        type="file"
        onChange={handleImageChange}
        className='block w-full text-sm text-slate-400
        file:mr-4 file:py-2 file:px-4
        file:rounded file:cursor-pointer file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100'
      />
      <button onClick={handleSubmit}>Enviar</button>

    </div>

    // <img src={img} alt='foto da pessoa' className='w-40 h-40  rounded-full border-2 border-white bg-center shadow-md' />
  )
}
