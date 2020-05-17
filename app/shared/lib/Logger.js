import pino from 'pino'

export default pino({
    name: 'root',
    timestamp: pino.stdTimeFunctions.isoTime,
    prettyPrint: {
        colorize: true,
        ignore: 'pid,hostname'
    }
})
