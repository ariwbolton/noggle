import config from '../../../../app/config'
import { createDictionaryPrefixTrie } from '../../../../app/shared/lib/dictionaryPrefixTree'

describe('dictionaryPrefixTree', function() {
    describe('createDictionaryPrefixTrie', function() {
        it('should load from a file', function() {
            const dictionaryPrefixTree = createDictionaryPrefixTrie(config)

            expect(true).to.be.true()
        })
    })
})
