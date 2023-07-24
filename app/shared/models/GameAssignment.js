import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { GameWord } from './GameWord.js'

export class GameAssignment {
    constructor({ game, user }) {
        this.id = uuidv4()
        this.game = game
        this.user = user
        this.gameWords = []
    }

    hasWord(word) {
        const existingGameWord = _.find(this.gameWords, (gameWord) => {
            return gameWord.word === word
        })

        return !!existingGameWord
    }

    addWord(word) {
        if (this.hasWord(word)) {
            throw new Error('Cannot add word for user which already exists')
        }

        this.gameWords.push(new GameWord({ user: this, word }))
    }

    removeWord(word) {
        if (!this.hasWord(word)) {
            throw new Error('Cannot remove word for user which already exists')
        }

        const index = _.findIndex(this.gameWords, (gameWord) => {
            return gameWord.word === word
        })

        // Remove the word
        this.gameWords.splice(index, 1)
    }
}
