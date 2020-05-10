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

    const lines = _.split(fileContents, '\n')
    const words = _.slice(lines, 2)
}

const dictionaryPrefixTree = createDictionaryPrefixTrie(config.dictionaryPrefixTree)

export default dictionaryPrefixTree

export {
    createDictionaryPrefixTrie
}
