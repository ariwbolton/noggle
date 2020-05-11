import _ from 'lodash'

import boardBank from '../../../../../testUtils/boardBank'
import NoggleGame from '../../../../../../app/shared/lib/Noggle/NoggleGame'

describe('createFromBoardString', function() {
    it('should create a board from a board string', function() {
        const boardString = boardBank.boardStrings.default
        const noggle = NoggleGame.createFromBoardString(boardString)

        const cellList = noggle.getCellList()
        const expectedCharacters = 'ABCDEFGHIJKLMNOP'

        expect(cellList.length).to.equal(expectedCharacters.length)
        _.each(cellList, function(cell, index) {
            expect(cell.character).to.equal(expectedCharacters[index])

            const expectedRowIndex = Math.floor(index / noggle.size)
            const expectedColIndex = index % noggle.size

            expect(cell.rowIndex).to.equal(expectedRowIndex)
            expect(cell.colIndex).to.equal(expectedColIndex)
        })
    })

    it('should throw if the board is malformed due too many rows', function() {
        const boardString = boardBank.boardStrings.tooManyRows

        const thrower = () => NoggleGame.createFromBoardString(boardString)
        expect(thrower).to.throw()
    })

    it('should throw if the board is malformed due too few rows', function() {
        const boardString = boardBank.boardStrings.tooFewRows

        const thrower = () => NoggleGame.createFromBoardString(boardString)
        expect(thrower).to.throw()
    })

    it('should throw if the board is malformed due too many items in a row', function() {
        const boardString = boardBank.boardStrings.tooManyItemsInRow

        const thrower = () => NoggleGame.createFromBoardString(boardString)
        expect(thrower).to.throw()
    })

    it('should throw if the board is malformed due too few items in a row', function() {
        const boardString = boardBank.boardStrings.tooFewItemsInRow

        const thrower = () => NoggleGame.createFromBoardString(boardString)
        expect(thrower).to.throw()
    })

    it('should throw if the board is malformed due to invalid characters used', function() {
        const boardString = boardBank.boardStrings.invalidCharacter

        const thrower = () => NoggleGame.createFromBoardString(boardString)
        expect(thrower).to.throw()
    })
})
