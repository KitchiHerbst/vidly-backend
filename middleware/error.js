const logger = require('../winston/errorLogger')

module.exports = function(err, req, res, next){
    //log exception(err)
    logger.error(err)
    
    res.status(500).send("Something failed");
  }

