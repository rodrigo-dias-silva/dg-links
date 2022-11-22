import React from 'react'
import Header from '../../components/Header'
import ImgPerfil from '../../components/ImgPerfil'
import Input from '../../components/Input'

export default function Profile() {
  return (
    <div className='flex items-center flex-col min-h-screen px-4 pb-7'>
      <Header />
      <div className='p-10'>
        <ImgPerfil />
      </div>

      <div className='flex flex-col gap-4 max-w-xl w-full px-5 mt-20'>
        <label className='font-medium text-white'>Nome de Perfil</label>
        <Input />
      </div>
    </div>
  )
}
