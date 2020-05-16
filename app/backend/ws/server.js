import SocketIOServer from 'socket.io'

export default async function initWsServer(httpServer) {
    const io = new SocketIOServer(httpServer.listener, {
        // Engine.io options
        transports: ['websocket']
    })

    io.on('connection', socket => {
        console.log(`Connected! ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`Disconnected. ${socket.id}`)
        })
    })

    return io
}
