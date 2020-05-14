import config from '../../../../app/config.js'
import dictionaryPrefixTree, { createDictionaryPrefixTrie } from '../../../../app/shared/lib/dictionaryPrefixTree.js'

describe('dictionaryPrefixTree', function() {
    describe('createDictionaryPrefixTrie', function() {
        it('should load from a file', function() {
            const dictionaryPrefixTree = createDictionaryPrefixTrie(config.dictionaryPrefixTree)

            // Pick a random prefix, ensure the number of words is always the same
            const wordCount = dictionaryPrefixTree.countPrefix('cata')
            expect(wordCount).to.equal(198)
        })

        it('should throw if dictionary file does not exist', function() {
            const thrower = () => createDictionaryPrefixTrie({ filename: './does-not-exist.txt' })
            expect(thrower).to.throw('no such file or directory')
        })

        it('should throw if dictionary file has words with spaces', function() {
            const thrower = () => createDictionaryPrefixTrie({ filename: './test/testData/bad-dictionary.txt' })
            expect(thrower).to.throw('Dictionary file malformed! Found words with spaces')
        })
    })

    it('should work as intended', function() {
        // Ignores case
        expect(dictionaryPrefixTree.hasWord('aardvark')).to.be.true
        expect(dictionaryPrefixTree.hasWord('AARDVARK')).to.be.true

        // Has first and last words
        expect(dictionaryPrefixTree.hasWord('aa')).to.be.true
        expect(dictionaryPrefixTree.hasWord('zzzs')).to.be.true

        // Should not have the empty string
        expect(dictionaryPrefixTree.hasWord('')).to.be.false
    })
})
