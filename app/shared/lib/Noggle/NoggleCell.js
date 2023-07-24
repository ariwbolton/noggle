import _ from 'lodash'

// All possible adjacent cell deltas
// [DY, DX]

/* eslint-disable no-multi-spaces */
const DIRECTION_DELTAS = [
    [-1, -1], // UP-LEFT
    [-1,  0], // UP
    [-1,  1], // UP-RIGHT
    [ 0,  1], // RIGHT
    [ 1,  1], // DOWN-RIGHT
    [ 1,  0], // DOWN
    [ 1, -1], // DOWN-LEFT
    [ 0, -1], // LEFT
]
/* eslint-enable no-multi-spaces */

export class NoggleCell {
    /**
     *
     * @param {NoggleGame} game
     * @param {String} character
     * @param {Integer} rowIndex
     * @param {Integer} colIndex
     */
    constructor(game, character, rowIndex, colIndex) {
        this.game = game
        this.character = character
        this.rowIndex = rowIndex
        this.colIndex = colIndex
    }

    get neighbors() {
        // Lazy load neighbors
        if (!this._neighbors) {
            const self = this
            const neighborCells = []

            // Try each direction, only keep the neighbors we find
            _.each(DIRECTION_DELTAS, function(directionDelta) {
                const [deltaRow, deltaCol] = directionDelta
                const possibleNeighborRow = self.rowIndex + deltaRow
                const possibleNeighborCol = self.colIndex + deltaCol

                if (self.game.isValidCoords(possibleNeighborRow, possibleNeighborCol)) {
                    neighborCells.push(self.game.getCell(possibleNeighborRow, possibleNeighborCol))
                }
            })

            this._neighbors = neighborCells
        }

        return this._neighbors
    }
}
