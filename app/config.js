import deepFreeze from 'deep-freeze'

export default deepFreeze({
    dictionary: {
        filename: './data/english-scrabble-dictionary.txt'
    },
    backend: {
        port: 5299
    },
    logLevel: 'debug'
})
