import _ from 'lodash'
import deepFreeze from 'deep-freeze'

import NoggleGame from '../../app/shared/lib/Noggle/NoggleGame'

/* eslint-disable key-spacing */
const BOARD_STRINGS = deepFreeze({
    default:                'A,B,C,D|E,F,G,H|I,J,K,L|M,N,O,P',
    tooManyRows:            'A,B,C,D|A,B,C,D|E,F,G,H|I,J,K,L|M,N,O,P',
    tooFewRows:             'E,F,G,H|I,J,K,L|M,N,O,P',
    tooManyItemsInRow:      'A,B,C,D,E|E,F,G,H|I,J,K,L|M,N,O,P',
    tooFewItemsInRow:       'A,B,C|E,F,G,H|I,J,K,L|M,N,O,P',
    invalidCharacter:       '1,2,3,4|E,F,G,H|I,J,K,L|M,N,O,P',
})
/* eslint-enable key-spacing */

export default class NoggleBoardBank {
    static get boardStrings() {
        return BOARD_STRINGS
    }

    static getBoard(_boardName) {
        const boardName = _.defaultTo(_boardName, 'default')
        const boardString = NoggleBoardBank.boardStrings[boardName]

        if (!boardString) {
            throw new Error(`Board string with name '${boardString}' not found`)
        }

        return NoggleGame.createFromBoardString(boardString)
    }
}
