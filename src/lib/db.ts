import { Redis } from 'ioredis';

export const db = new Redis(
    `${process.env.UPSTASH_REDIS_CONNECTION_URL}`,
)