import io from 'socket.io-client'

io('http://localhost:5299', {
    transports: ['websocket'],
    autoConnect: false,
})
