import boardBank from '../../../../../testUtils/boardBank.js'

describe('getBoardString', function() {
    it('should serialize a board correctly', function() {
        const defaultGame = boardBank.getBoard('default')

        expect(defaultGame.getBoardString()).to.equal(boardBank.boardStrings.default)
    })
})
