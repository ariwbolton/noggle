import _ from 'lodash'

import NoggleCell from '../../../../../../app/shared/lib/Noggle/NoggleCell.js'
import NoggleGame from '../../../../../../app/shared/lib/Noggle/NoggleGame.js'

describe('createRandom', function() {
    it('should create a board correctly using the new dice', function() {
        const noggle = NoggleGame.createRandom('newDice')

        const board = noggle.board
        expect(board.length).to.equal(4)
        _.each(board, function(row) {
            expect(row.length).to.equal(4)

            _.each(row, function(cell) {
                expect(cell).to.be.an.instanceOf(NoggleCell)
            })
        })
    })

    it('should create a board correctly using the old dice', function() {
        const noggle = NoggleGame.createRandom('oldDice')

        const board = noggle.board
        expect(board.length).to.equal(4)
        _.each(board, function(row) {
            expect(row.length).to.equal(4)

            _.each(row, function(cell) {
                expect(cell).to.be.an.instanceOf(NoggleCell)
            })
        })
    })

    it('should create random boards using the new dice', function() {
        const noggle1 = NoggleGame.createRandom('newDice')
        const noggle2 = NoggleGame.createRandom('newDice')

        expect(noggle1.getBoardString()).to.not.equal(noggle2.getBoardString())
    })

    it('should create random boards using the old dice', function() {
        const noggle1 = NoggleGame.createRandom('oldDice')
        const noggle2 = NoggleGame.createRandom('oldDice')

        expect(noggle1.getBoardString()).to.not.equal(noggle2.getBoardString())
    })

})
