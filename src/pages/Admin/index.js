import React, { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify';

import Header from '../../components/Header'
import Logo from './../../components/Logo';
import Input from './../../components/Input';
import { ButtonLink } from './../../components/Button';

import { db } from '../../services/firebaseConnection';

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

export default function Admin() {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [bgColorInput, setBgColorInput] = useState('#f1f1f1');
  const [textColorInput, setTextColorInput] = useState('#131313');

  const [links, setLinks] = useState([]);

  useEffect(() => {

    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))

    onSnapshot(queryRef, (snapshot) => {
      let list = [];

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
  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    if (nameInput === '' || urlInput === '') {
      toast.warn('Preencha todos os campos!')
      return;
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput('')
        setUrlInput('')
        toast.success('Link registrado com sucesso!')
      })
      .catch((error) => {
        toast.error('Ops.. Algo deu errado ' + error)
      })
  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)
  }

  return (
    <div className='flex items-center flex-col min-h-screen px-4 pb-7'>
      <Header />

      <form
        onSubmit={handleRegister}
        className='flex flex-col gap-4 max-w-xl w-full px-5 mt-20'
      >
        <label className='font-medium text-white'>Nome do link</label>
        <Input
          placeholder='Digite o nome do link...'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className='font-medium text-white'>URL do link</label>
        <Input
          type='url'
          placeholder='Digite a url...'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className='flex mt-4 gap-6'>
          <div className='flex gap-4'>
            <label className='text-white'>Fundo do link</label>
            <input
              type={'color'}
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
          <div className='flex gap-4'>
            <label className='text-white'>Texto do link</label>
            <input
              type={'color'}
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className='mb-7 p-1 border border-slate-400 rounded flex items-center justify-center flex-col'>
            <label className='text-white'>Veja como está ficando</label>
            <article
              className='w-11/12 max-w-xl flex items-center rounded my-2 px-3 py-3'
              style={{ backgroundColor: bgColorInput }}
            >
              <p style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <ButtonLink
          text='Cadastrar'
        />
      </form>

      <span className='text-white mt-10 mb-4 font-semibold text-lg'>
        Meus links
      </span>

      {links.map((item, index) => (
        <article
          key={index}
          className='w-11/12 max-w-xl flex items-center rounded px-3 py-3 justify-between animate-[pulse_2s_ease-in-out] mb-4'
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <span>{item.name}</span>
          <div>
            <button
              onClick={() => handleDeleteLink(item.id)}
              className='border border-dashed border-white py-2 px-2 bg-slate-800 rounded-full'>
              <FiTrash2 size={18} color='#fff' />
            </button>
          </div>
        </article>
      ))}
      <Logo />
    </div>
  )
}
