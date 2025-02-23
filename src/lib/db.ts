import { Redis } from 'ioredis';

export const db = new Redis(
    `${process.env.UPSTASH_REDIS_REST_URL}`,
)