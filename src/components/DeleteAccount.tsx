'use client'

import axios from 'axios';
import { FC } from 'react'
import Button from './ui/Button';
import { signOut } from 'next-auth/react';

interface DeleteAccountProps {
  id: string
}

const DeleteAccount: FC<DeleteAccountProps> = ({ id }) => {
  async function deleteAccount() {
    const response = await axios.delete('/api/account', { data: { id } })

    if (response.statusText === 'OK') {
      console.log('deleted')
      await signOut();
    }
  }
  return <Button onClick={deleteAccount} className='rounded-xl bg-red-500 hover:bg-red-600'>Delete Account</Button>
}

export default DeleteAccount