'use client'

import { fetchRedis } from '@/helpers/redis';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { z } from 'zod';
import Button from './ui/Button';

interface DeleteAccountProps {
  email: string
}

const DeleteAccount: FC<DeleteAccountProps> = ({ email }) => {
    const router = useRouter()
  return <Button className='rounded-xl bg-red-500 hover:bg-red-600'>Delte Account</Button>
}

export default DeleteAccount