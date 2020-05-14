import _ from 'lodash'

import dictionaryPrefixTree from '../dictionaryPrefixTree.js'
import NoggleCell from './NoggleCell.js'

const ITEM_SEPARATOR = ','
const ROW_SEPARATOR = '\\|'
const CHARACTER_REGEX = /[A-Z]/
const ROW_REGEX = new RegExp(_.join(_.times(4, () => CHARACTER_REGEX.source), ITEM_SEPARATOR))
const SUBSTRING_BOARD_REGEX = new RegExp(_.join(_.times(4, () => ROW_REGEX.source), ROW_SEPARATOR))
const BOARD_REGEX = new RegExp(`^${SUBSTRING_BOARD_REGEX.source}$`)

const INVALID_Q_WORD_REGEX = /Q(?!U)/
const QU_REGEX = /QU/g

export function fastArrayPrefixMatch(targetArray, prefixCellArray) {
    return prefixCellArray.every(function(prefixCell, index) {
        return targetArray[index] === prefixCell.character
    })
}

export default class NoggleGame {
    constructor() {
        // Empty constructor because the intent is to use setBoard
    }

    /**
     * Should be called immediately after construction
     * @param {NoggleCell[][]} board
     */
    setBoard(board) {
        this.board = board
        this.size = this.board.length
    }

    /**
     *
     * Expects strings of the form "A,B,C,D|E,F,G,H|I,J,K,L|M,N,O,P", which corresponds to the following board:
     *
     *      ABCD
     *      EFGH
     *      IJKL
     *      MNOP
     *
     * @param {String} stringBoard
     *
     * @returns {NoggleGame}
     */
    static createFromBoardString(stringBoard) {
        if (!BOARD_REGEX.test(stringBoard)) {
            throw new Error('Malformed board!')
        }

        const stringRows = _.split(stringBoard, '|')
        const stringRowsChars = _.map(stringRows, stringRow => _.split(stringRow, ','))

        // Initialize board
        const board = []
        const game = new NoggleGame()

        _.each(stringRowsChars, function(stringRowChars, rowIndex) {
            const row = []

            _.each(stringRowChars, function(stringChar, colIndex) {
                const cell = new NoggleCell(game, stringChar, rowIndex, colIndex)

                row.push(cell)
            })

            board.push(row)
        })

        game.setBoard(board)

        return game
    }

    isValidCoords(rowIndex, colIndex) {
        const isValidRow = 0 <= rowIndex && rowIndex < this.size
        const isValidCol = 0 <= colIndex && colIndex < this.size

        return isValidRow && isValidCol
    }

    getCell(rowIndex, colIndex) {
        if (!this.isValidCoords(rowIndex, colIndex)) {
            throw new Error(`Invalid coords used! Row: ${rowIndex}, Col: ${colIndex}`)
        }

        return this.board[rowIndex][colIndex]
    }

    getCellList() {
        return _.flatMap(this.board)
    }

    /**
     *
     * @param {String} word
     *
     * @return {boolean}
     */
    isWordPossible(word) {
        if (!_.isString(word)) {
            throw new Error('Can only check if isWordPossible for strings')
        }

        if (word.length === 0) {
            throw new Error('Cannot search for an empty string')
        }

        const wordCaps = _.toUpper(word)

        // Check if Q is followed by something other than a U
        // Not allowed in Noggle!
        if (INVALID_Q_WORD_REGEX.test(wordCaps)) {
            return false
        }

        const wordCapsWithQUReplaced = wordCaps.replace(QU_REGEX, 'Q')
        const wordCapsArray = _.toArray(wordCapsWithQUReplaced)
        const cellList = this.getCellList()
        const self = this

        let result = false

        _.each(cellList, function(cell) {
            const path = [cell]
            const set = new Set(path)

            let shouldContinue = true
            const isWordPossibleStartingFromCell = self._recurse(wordCapsArray, path, set)

            if (isWordPossibleStartingFromCell) {
                result = true
                shouldContinue = false
            }

            return shouldContinue
        })

        return result
    }

    _recurse(wordCapsArray, currentPath, currentSet) {
        const self = this

        // If the current path is invalid, stop recursing on this branch
        const isPathValidPrefix = fastArrayPrefixMatch(wordCapsArray, currentPath)

        if (!isPathValidPrefix) {
            return false
        }

        // If we've recursed up to the length of the word, and we didn't reject due to invalid prefix, this is a match!
        // Stop recursing and return
        if (currentPath.length === wordCapsArray.length) {
            return true
        }

        let anyMatchFound = false

        // Otherwise continue recursing. If any match is found, return true. Otherwise, false.
        const currentCell = _.last(currentPath)
        _.each(currentCell.neighbors, function(neighborCell) {
            let shouldContinue = true

            if (!currentSet.has(neighborCell)) {
                currentPath.push(neighborCell)
                currentSet.add(neighborCell)

                const foundMatch = self._recurse(wordCapsArray, currentPath, currentSet)

                currentPath.pop()
                currentSet.delete(neighborCell)

                if (foundMatch) {
                    anyMatchFound = true
                    shouldContinue = false
                }
            }

            return shouldContinue
        })

        return anyMatchFound
    }

    isWordReal(word) {
        return dictionaryPrefixTree.hasWord(word)
    }

    isWordValid(word) {
        return this.isWordPossible(word) && this.isWordReal(word)
    }
}
