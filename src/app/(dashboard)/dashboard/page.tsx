import { getServerSession } from 'next-auth' 
import { authOptions } from '@/lib/auth'

const page = async ({}) => {
    const session = await getServerSession(authOptions)
  return <>
  <pre>Dashboard</pre>
  </>
}

export default page