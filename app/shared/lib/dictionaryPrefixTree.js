import fs from 'fs'

import _ from 'lodash'
import trie from 'trie-prefix-tree'

import config from '../../config'

/**
 *
 * @param {Object} props
 * @param {PathLike} props.filename
 *
 * @returns {trie}
 */
function createDictionaryPrefixTrie(props) {
    const fileContents = fs.readFileSync(props.filename, 'utf8')

    const words = _(fileContents)
    .split('\r\n')
    .slice(2)
    .value()

    _.each(words, function(word) {
        if (_.includes(word, ' ')) {
            throw new Error(`Dictionary file malformed! Found words with spaces: ${word}`)
        }
    })

    return trie(words)
}

const dictionaryPrefixTree = createDictionaryPrefixTrie(config.dictionaryPrefixTree)

export default dictionaryPrefixTree

export {
    createDictionaryPrefixTrie
}
