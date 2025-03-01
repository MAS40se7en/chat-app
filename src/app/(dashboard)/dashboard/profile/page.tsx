import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation';
import Image from 'next/image'
import DeleteAccount from '@/components/DeleteAccount';


const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) notFound();

    const user = (await fetchRedis('get', `user:${session.user.id}`)) as string;

    const parsedUser = JSON.parse(user) as User;

    console.log(parsedUser);
    return <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)] border-2 rounded-2xl py-10 bg-white'>
        <div className='py-3'>
            <div className='relative flex items-center space-x-4 px-6'>
                <div className='relative'>
                    <div className='w-16 h-16'>
                            <Image
                                fill
                                referrerPolicy='no-referrer'
                                className='rounded-full'
                                src={parsedUser.image || ''}
                                alt='Your profile picture'
                            />
                    </div>
                </div>
                <p className='text-xl font-semibold'>{parsedUser.name}</p>
            </div>
            <div className='flex items-center px-2 ml-24 mt-12'>
                <p className='text-gray-500'>{parsedUser.email}</p>
            </div>
        </div>
        <div className='ml-24'>
            <DeleteAccount id={parsedUser.id} />
        </div>
    </div>
}

export default page