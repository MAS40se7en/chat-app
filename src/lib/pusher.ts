import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: "1949529",
    key: "442058e41fd34837ba48",
    secret: "275e25cc553aa6a88882",
    cluster: "eu",
    useTLS: true
})

export const pusherClient = new PusherClient("442058e41fd34837ba48", { cluster: "eu" })