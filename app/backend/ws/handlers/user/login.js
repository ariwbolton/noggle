export default {
    name: 'user.login',
    options: {
        auth: 'optional'
    },
    handler: async function(request) {
        // TODO: Develop more sophisticated login scheme...
        const [userId] = request.args

        request.socket.userId = userId
    }
}
