//these types are for the database model and they are available all over the app
import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type userId = string

declare module 'next-auth/jwt' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface JWT {
        id: UserId
    }
}

declare module 'next-auth' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Session {
        user: User & {
            id: UserId
        }
    }
}