// Temporary database implementation to unblock other work!

import { Game } from '../shared/models/Game.js'
import { User } from '../shared/models/User.js'

export const users = []
export const games = []

export function createUser(props) {
    this.users.push(new User(props))
}

export function createGame(props) {
    this.games.push(new Game(props))
}
