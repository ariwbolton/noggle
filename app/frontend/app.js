import io from 'socket.io-client'

console.log('nice!')

io('http://localhost:5299', {
    transports: ['websocket']
})
