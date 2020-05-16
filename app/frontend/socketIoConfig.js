import _ from 'lodash'
import io from 'socket.io-client'

// Uncomment to enable socketio debugging
localStorage.debug = ''

const socket = io('http://localhost:5299', {
    transports: ['websocket'],
    // autoConnect: false,
})

const socketEventNames = [
    'connect',
    'connect_error',
    'connect_timeout',
    'error',
    'disconnect',
    'reconnect',
    'reconnect_attempt',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed',
    'ping',
    'pong'
]

_.each(socketEventNames, function(eventName) {
    socket.on(eventName, function(data) {
        console.log(`${eventName}: ${data}`)
    })
})

socket.on('counter', (data, callback) => {
    console.log('Received data', data)
    callback('thanks!')
})

export default socket
