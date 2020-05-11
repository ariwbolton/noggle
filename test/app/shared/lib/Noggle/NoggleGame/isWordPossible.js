import boardBank from '../../../../../testUtils/boardBank'

describe('isWordPossible', function() {
    it('should find strings in a board', function() {
        const defaultGame = boardBank.getBoard()
        expect(defaultGame.isWordPossible('a')).to.be.true // Single character
        expect(defaultGame.isWordPossible('p')).to.be.true // Single character, last
        expect(defaultGame.isWordPossible('abcd')).to.be.true // Entire row
        expect(defaultGame.isWordPossible('aeim')).to.be.true // Entire column
        expect(defaultGame.isWordPossible('dhlp')).to.be.true // Entire column, right side
        expect(defaultGame.isWordPossible('mnop')).to.be.true // Entire row, bottom

        expect(defaultGame.isWordPossible('afeb')).to.be.true // Diagonals

        const duplicatesGame = boardBank.getBoard('duplicates')
        expect(duplicatesGame.isWordPossible('aba')).to.be.true
        expect(duplicatesGame.isWordPossible('aa')).to.be.true
        expect(duplicatesGame.isWordPossible('aafa')).to.be.true
    })

    it('should not find strings not in a board', function() {
        const defaultGame = boardBank.getBoard()
        expect(defaultGame.isWordPossible('aa')).to.be.false // Duplicate letters
        expect(defaultGame.isWordPossible('aba')).to.be.false // Reusing same letter
        expect(defaultGame.isWordPossible('ac')).to.be.false // Skip letter
        expect(defaultGame.isWordPossible('ca')).to.be.false // Skip letter, reversed
        expect(defaultGame.isWordPossible('abd')).to.be.false // Two letters, then skip
        expect(defaultGame.isWordPossible('ai')).to.be.false // Skip letter, down
        expect(defaultGame.isWordPossible('ia')).to.be.false // Skip letter, down, reversed
        expect(defaultGame.isWordPossible('z')).to.be.false // missing letter
    })

    it('should throw if the word is not a string', function() {
        const defaultGame = boardBank.getBoard()
        const thrower = () => defaultGame.isWordPossible(0)
        expect(thrower).to.throw('Can only check if isWordPossible for strings')
    })
})
