import _ from 'lodash'

import dictionaryPrefixTree from '../dictionaryPrefixTree'
import NoggleCell from './NoggleCell'

const CHARACTER_REGEX = /[A-Z]/
const ROW_REGEX = new RegExp(`${CHARACTER_REGEX.source},${CHARACTER_REGEX.source},${CHARACTER_REGEX.source},${CHARACTER_REGEX.source}`)
const BOARD_REGEX = new RegExp(`${ROW_REGEX.source}|${ROW_REGEX.source}|${ROW_REGEX.source}|${ROW_REGEX.source}`)

export function fastArrayPrefixMatch(targetArray, prefixCellArray) {
    return prefixCellArray.every(function(prefixCell, index) {
        return targetArray[index] === prefixCell.character
    })
}

export default class NoggleGame {
    /**
     *
     * @param {Object} props
     * @param {NoggleCell[][]} props.board
     */
    constructor(props) {
        this.board = props.board
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
        if (!BOARD_REGEX.match(stringBoard)) {
            throw new Error('Malformed board!')
        }

        const stringRows = _.split(stringBoard, '|')
        const stringRowsChars = _.map(stringRows, rowString => _.split(rowString, ','))

        // Initialize board
        const board = []

        _.each(stringRows, function(stringRow, rowIndex) {
            const row = []

            _.each(stringRowsChars, function(stringChar, colIndex) {
                const cell = new NoggleCell(this, stringChar, rowIndex, colIndex)

                row.push(cell)
            })

            board.push(row)
        })

        return new NoggleGame({ board })
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
        return _.concat(this.board)
    }

    /**
     *
     * @param {String} word
     *
     * @return {boolean}
     */
    isWordPossible(word) {
        const wordCapsArray = _.toArray(_.toUpper(word))
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
