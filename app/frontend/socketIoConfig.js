import io from 'socket.io-client'

export default io('http://localhost:5299', {
    transports: ['websocket'],
    // autoConnect: false,
})

// manager.open((result) => {
//     console.log('Result:', result)
// })
