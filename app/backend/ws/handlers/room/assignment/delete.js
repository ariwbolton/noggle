export default {
    name: 'room.assignment.delete',
    handler: async function(request) {
        // Needs authentication
        // User needs to match the assignment, or be owner of the room
        // Delete game assignment, if appropriate (will notify that game was left)
        // Delete room assignment
        // Notify users that room was left (only notify OTHER users)
    }
}
