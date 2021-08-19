const winston = require('winston')
require('winston-mongodb')

const logConfiguration = {
    transports: [
      new winston.transports.File ({
        level: 'error',
        filename: 'logfile.log'
      }),
      // new winston.transports.MongoDB ({
      //   level: 'error',
      //   db: 'mongodb://localhost/vidly'
      // })
    ]
  }
  
  const logger = winston.createLogger(logConfiguration)
  
  module.exports = logger
  // winston.add(winston.transports.File, {filename: 'logfile.log'})
  // winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly'})