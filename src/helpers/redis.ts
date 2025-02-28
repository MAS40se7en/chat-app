const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers' | 'del'

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    try {
        const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

        const response = await fetch(commandUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error(`Error executing Redis command: ${response.statusText}`)
        }

        const data = await response.json();

        return data.result;
    } catch (error) {
        return new Response('Error executing Redis command', { status: 500 })
    }
}