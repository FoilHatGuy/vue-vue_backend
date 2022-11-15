var express = require('express');
var router = express.Router();
const pg = require('pg')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
      {key: "value",
             content: [
               {id:0, type: "field"},
               {id:1, type: "field"},
             ]});
});

module.exports = router;
