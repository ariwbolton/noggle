import { v4 as uuidv4 } from 'uuid'

export class Room {
    constructor() {
        this.id = uuidv4()
        this.users = new Set()
    }

    addUser(user) {
        this.users.add(user)
    }

    removeUser(user) {
        this.users.remove(user)
    }
}
