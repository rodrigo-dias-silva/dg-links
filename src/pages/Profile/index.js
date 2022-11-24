import React, { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import Header from '../../components/Header'
import ImgPerfil from '../../components/ImgPerfil'
import Input from '../../components/Input'

import { toast } from 'react-toastify';

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

export default function Profile() {

  const [nameProf, setNameProf] = useState('')

  useEffect(() => {
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

  }, [])

  function handleSave(e) {
    e.preventDefault();

    setDoc(doc(db, 'profile', 'name'), {
      profilename: nameProf
    })
      .then(() => {
        toast.success('Nome salvo com sucesso')
      })
      .catch(() => {
        toast.error("Ops... algo deu errado D':")
      })
  }

  return (
    <div className='flex items-center flex-col min-h-screen px-4 pb-7'>
      <Header />
      <div className='flex flex-col max-w-xl items-center gap-4 pb-5 pt-10 px-5 w-full'>
        <label className='font-medium text-white'>Foto de Perfil</label>
        <ImgPerfil />
      </div>

      <form className='flex flex-col gap-4 max-w-xl w-full px-5' onSubmit={handleSave}>
        <label className='font-medium text-white'>Nome de Perfil</label>
        <Input
          placeholder={'Digite seu nome de perfil'}
          value={nameProf}
          onChange={(e) => setNameProf(e.target.value)}
        />
        <Button type='submit' text={'Salvar'} />
      </form>
    </div>
  )
}
