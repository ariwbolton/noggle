export default {
    name: 'room.create',
    handler: async function([name], socket) {
        socket.join(name, (err) => {
            console.log(`Error joining room with name: ${name}`)
            console.log(err)
        })
    }
}
