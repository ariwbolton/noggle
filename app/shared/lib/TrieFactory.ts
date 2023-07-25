import fs from 'fs'

import _ from 'lodash'
import trie from 'trie-prefix-tree'

import config from '../../config.js'

export class TrieFactory {
    static fromFile(filename: string) {
        const fileContents = fs.readFileSync(filename, 'utf8')

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
}

export const englishWordsTrie = TrieFactory.fromFile(config.dictionary.filename)
