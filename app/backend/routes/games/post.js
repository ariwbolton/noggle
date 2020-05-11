export default {
    method: 'POST',
    path: '/games',
    handler: async function(request) {
        return {
            message: 'it is working!!'
        }
    }
}
