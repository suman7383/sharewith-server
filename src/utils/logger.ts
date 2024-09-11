import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'

//linking trace support
sourceMapSupport.install()

const colorisLevel = (level: string) => {
    switch (level) {
        case 'info':
            return blue(level)
        case 'error':
            return red(level)
        case 'warn':
            return yellow(level)
        default:
            return level
    }
}

const consoleLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta } = info

    const customLevel = colorisLevel(level.toLowerCase())

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${green(timestamp as string)}] ${message}\n${magenta('META')} ${customMeta}\n`

    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    //print to console only in development
    if (
        (config.ENV as EApplicationEnvironment) === EApplicationEnvironment.DEV
    ) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport()]
})
