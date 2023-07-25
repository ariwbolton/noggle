import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { NoggleGame } from '../lib/Noggle/NoggleGame.js'
import { GameAssignment } from './GameAssignment.js'

export class Game {
    constructor({ users, noggle }) {
        this.id = uuidv4()
        this.gameAssignments = _.map(users, (user) => {
            return new GameAssignment({ game: this, user })
        })

        this.noggle = noggle || NoggleGame.createRandom()
        this.userWords = []
    }

    getAssignmentForUser(user) {
        const assignment = _.find(this.gameAssignments, (gameAssignment) => {
            return gameAssignment.user.id === user.id
        })

        if (!assignment) {
            throw new Error('Game does not have user assigned')
        }

        return assignment
    }

    addWordForUser(user, word) {
        const assignment = this.getAssignmentForUser(user)

        assignment.addWord(word)
    }
}
