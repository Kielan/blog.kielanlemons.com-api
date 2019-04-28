'use strict'
const { logConfig } = require('../config')
const winston = require('winston')
const fs = require('fs')

fs.existsSync(logConfig.dir) || fs.mkdirSync(logConfig.dir)

const eOpts = Object.assign({}, logConfig.eLogOptions, {filename: logConfig.dir + "/" + logConfig.error.fn})
const e = new winston.Logger({
  transports: [
    new winston.transports.File(eOpts),
    new winston.transports.Console(logConfig.error.options.console)
  ],
  exitOnError: false
})

module.exports = {
  e,
}
