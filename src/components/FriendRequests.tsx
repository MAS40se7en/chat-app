'use client'

import { FC, useEffect, useState } from 'react'
import { Check, UserPlus, X } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({incomingFriendRequests, sessionId}) => {
    const [FriendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequests
    )

    const router = useRouter()

    useEffect(() => {
        pusherClient.subscribe(
            toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        )

        const FriendRequestHandler = ({ senderId, senderEmail}: IncomingFriendRequest) => {
            setFriendRequests((prev) => [...prev, { senderId, senderEmail}])
        }

        pusherClient.bind('incoming_friend_requests', FriendRequestHandler)

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            )

            pusherClient.unbind('incoming_friend_requests', FriendRequestHandler)
        }
    }, [sessionId])

    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/friends/accept', { id: senderId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }

    const denyFriend = async (senderId: string) => {
        await axios.post('/api/friends/deny', { id: senderId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }
    
  return <>
        {FriendRequests.length === 0 ? (
            <p className='text-sm text-zinc-500'>Nothing to show here...</p>
        ) : (
            FriendRequests.map((request) => (
                <div key={request.senderId} className='flex gap-4 items-center'>
                    <UserPlus className='text-black' />
                    <p className='font-medium text-lg'>{request.senderEmail}</p>
                    <button onClick={() => acceptFriend(request.senderId)} aria-label='accept friend' className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'><Check className='font-semibold text-white w-3/4 h-3/4' /></button>
                    <button onClick={() => denyFriend(request.senderId)} aria-label='deny friend' className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'><X className='font-semibold text-white w-3/4 h-3/4' /></button>
                </div>
            ))
        )}
  </>
}

export default FriendRequests