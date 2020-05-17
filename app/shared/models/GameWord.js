import { v4 as uuidv4 } from 'uuid'

export default class GameWord {
    constructor({ gameAssignment, word }) {
        this.id = uuidv4()
        this.gameAssignment = gameAssignment
        this.word = word
    }
}
