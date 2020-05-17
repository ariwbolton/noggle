import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const asciiLowercase = 'abcdefghijklmnopqrstuvwxyz'

function getRandomUsername() {
    const firstName = _.sample(['alice', 'bob', 'ari', 'jane'])
    const lastName = _.sample(['smith', 'johnson', 'jones', 'miller'])
    const middle = _.sample(asciiLowercase)

    return `${firstName}${middle}${lastName}`
}

function getRandomLoginCode() {
    const codeCharacters = []

    _.times(5, () => {
        codeCharacters.push(_.sample(asciiLowercase))
    })

    return codeCharacters
}

export default class User {
    constructor({ username, loginCode }) {
        this.id = uuidv4()
        this.username = username || getRandomUsername()
        this.loginCode = loginCode || getRandomLoginCode()
    }
}
