import config from '../../../../app/config.js'
import { TrieFactory, englishWordsTrie } from '../../../../app/shared/lib/TrieFactory.ts'

describe('TrieFactory', function() {
    describe('fromFile', function() {
        it('should load from a file', function() {
            const trie = TrieFactory.fromFile(config.dictionary.filename)

            // Pick a random prefix, ensure the number of words is always the same
            const wordCount = trie.countPrefix('cata')
            expect(wordCount).to.equal(198)
        })

        it('should throw if dictionary file does not exist', function() {
            const thrower = () => TrieFactory.fromFile('./does-not-exist.txt')
            expect(thrower).to.throw('no such file or directory')
        })

        it('should throw if dictionary file has words with spaces', function() {
            const thrower = () => TrieFactory.fromFile('./test/testData/bad-dictionary.txt')
            expect(thrower).to.throw('Dictionary file malformed! Found words with spaces')
        })
    })

    it('should work as intended', function() {
        // Ignores case
        expect(englishWordsTrie.hasWord('aardvark')).to.be.true
        expect(englishWordsTrie.hasWord('AARDVARK')).to.be.true

        // Has first and last words
        expect(englishWordsTrie.hasWord('aa')).to.be.true
        expect(englishWordsTrie.hasWord('zzzs')).to.be.true

        // Should not have the empty string
        expect(englishWordsTrie.hasWord('')).to.be.false
    })
})
