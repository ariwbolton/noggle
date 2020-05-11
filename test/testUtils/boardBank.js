import deepFreeze from 'deep-freeze'

import NoggleGame from '../../app/shared/lib/Noggle/NoggleGame'

const BOARD_STRINGS = deepFreeze({
    defaultBoard: 'A,B,C,D|E,F,G,H|I,J,K,L|M,N,O,P'
})

export default class NoggleBoardBank {
    static get boardStrings() {
        return BOARD_STRINGS
    }

    static getBoard(boardName) {
        const boardString = NoggleBoardBank.boardStrings[boardName]

        if (!boardString) {
            throw new Error(`Board string with name '${boardString}' not found`)
        }

        return NoggleGame.createFromBoardString(boardString)
    }
}
