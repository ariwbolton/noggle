import deepFreeze from 'deep-freeze'

export default deepFreeze({
    dictionaryPrefixTree: {
        filename: './data/english-scrabble-dictionary.txt'
    },
    backend: {
        port: 5299
    }
})
