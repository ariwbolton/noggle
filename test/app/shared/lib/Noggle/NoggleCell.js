import _ from 'lodash'

import boardBank from '../../../../testUtils/boardBank'

describe('NoggleCell', function() {
    let game

    beforeEach(function() {
        game = boardBank.getBoard()
    })

    it('should get correct neighbors for a cell in the middle', function() {
        const cell = game.getCell(1, 1)
        const neighbors = cell.neighbors
        const expectedNeighbors = 'ABCEGIJK'

        expect(neighbors.length).to.equal(expectedNeighbors.length)
        _.each(neighbors, function(neighbor) {
            const foundCharacter = _.includes(expectedNeighbors, neighbor.character)
            expect(foundCharacter).to.be.true
        })
    })

    it('should get correct neighbors for a cell on the top', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell on the left', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell on the right', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell on the bottom', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell on the top', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell in the top left', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell in the bottom left', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell in the top right', function() {
        throw new Error('not implemented')
    })

    it('should get correct neighbors for a cell in the bottom right', function() {
        throw new Error('not implemented')
    })
})
