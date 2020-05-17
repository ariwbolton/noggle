export default {
    name: 'system.alive',
    options: {
        auth: 'optional'
    },
    handler: function(request) {
        return 'alive'
    }
}
