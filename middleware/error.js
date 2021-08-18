module.exports = function(err, req, res, next){
    //log exception(err)
    res.status(500).send("Something failed");
  }

