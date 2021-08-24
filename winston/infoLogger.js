const winston = require('winston')
require('winston-mongodb')

const logConfiguration = {
    transports: [
      // new winston.transports.File ({
      //   level: 'info',
      //   filename: 'logfile.log'
      // }),
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true,
        level: 'info'
      }),
      // new winston.transports.MongoDB ({
      //   level: 'info',
      //   db: 'mongodb://localhost/vidly'
      // })
    ]
  }
  
  const logger = winston.createLogger(logConfiguration)
  
  module.exports = logger