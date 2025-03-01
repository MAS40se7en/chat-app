'use client'

import { pusherClient } from '@/lib/pusher'
import { chatHrefContructor, toPusherKey } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UnseenChatToast from './UnseenChatToast'

interface SideBarChatListProps {
    friends: User[]
    sessionId: string
}

interface extendedMessage extends Message {
    senderImg: string
    senderName: string
}

const SideBarChatList: FC<SideBarChatListProps> = ({ friends, sessionId }) => {
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname?.includes('chat')) {
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId))
            })
        }

        pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

        const newFriendHandler = () => {
            router.refresh()
        }

        const chatHandler = (message: extendedMessage) => {
            const shouldNotify = pathname !== `/dashboard/chat/${chatHrefContructor(sessionId, message.senderId)}`

            if (!shouldNotify) return

            // should notify
            toast.custom((t) => (
                // custom component
                <UnseenChatToast 
                    senderImg={message.senderImg} 
                    senderMessage={message.text} 
                    sessionId={sessionId} 
                    senderName={message.senderName} 
                    t={t} 
                    senderId={message.senderId} 
                />
            ))

            setUnseenMessages((prev) => [...prev, message])
        }

        pusherClient.bind('new_message', chatHandler)
        pusherClient.bind('new_friend', newFriendHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))
        }
    }, [pathname, sessionId, router])

    return <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
        {friends.sort().map((friend) => {
            const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
                return unseenMessage.senderId === friend.id
            }).length

            return (<li key={friend.id}>
                <a href={`/dashboard/chat/${chatHrefContructor(
                    sessionId,
                    friend.id
                )}`} className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                    {friend.name}
                    {unseenMessagesCount > 0 ? (
                        <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
                            {unseenMessagesCount}
                        </div>
                    ) : null}
                </a>
            </li>)
        })}
    </ul>
}

export default SideBarChatList