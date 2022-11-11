import React, { useState } from 'react'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import Logo from '../../components/Logo'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!')
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Bem vindo de volta :D')
        navigate('/admin', { replace: true })
      })
      .catch(() => {
        toast.error('Erro ao tentar fazer o login!')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-8'>
      <Logo />
      <form
        className='flex flex-col items-center w-full gap-4'
        onSubmit={handleLogin}
      >
        <Input
          type='email'
          placeholder='Digite aqui o seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='*******'
          autoComplete='on'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' text='Acessar' />
      </form>
    </div>
  )

}
