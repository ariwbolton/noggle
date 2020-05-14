import _ from 'lodash'

import boardBank from '../../../../testUtils/boardBank.js'

describe('NoggleCell', function() {
    let game

    beforeEach(function() {
        game = boardBank.getBoard()
    })

    function assertNeighbors(cell, expectedNeighborCharacters) {
        const neighbors = cell.neighbors

        expect(neighbors.length).to.equal(expectedNeighborCharacters.length)
        _.each(neighbors, function(neighbor) {
            const foundCharacter = _.includes(expectedNeighborCharacters, neighbor.character)
            expect(foundCharacter).to.be.true
        })
    }

    it('should get correct neighbors for a cell in the middle', function() {
        const cell = game.getCell(1, 1)
        const expectedNeighborChjaracters = 'ABCEGIJK'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell on the top', function() {
        const cell = game.getCell(0, 1)
        const expectedNeighborChjaracters = 'ACEFG'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell on the left', function() {
        const cell = game.getCell(1, 0)
        const expectedNeighborChjaracters = 'ABFIJ'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell on the right', function() {
        const cell = game.getCell(1, 3)
        const expectedNeighborChjaracters = 'CDGKL'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell on the bottom', function() {
        const cell = game.getCell(3, 1)
        const expectedNeighborChjaracters = 'IJKMO'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell in the top left', function() {
        const cell = game.getCell(0, 0)
        const expectedNeighborChjaracters = 'BEF'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell in the bottom left', function() {
        const cell = game.getCell(3, 0)
        const expectedNeighborChjaracters = 'IJN'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell in the top right', function() {
        const cell = game.getCell(0, 3)
        const expectedNeighborChjaracters = 'CGH'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })

    it('should get correct neighbors for a cell in the bottom right', function() {
        const cell = game.getCell(3, 3)
        const expectedNeighborChjaracters = 'KLO'
        assertNeighbors(cell, expectedNeighborChjaracters)
    })
})
