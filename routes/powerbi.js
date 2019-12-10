let express = require('express');
let router = express.Router();
let connection = require('../pool');

router.get('/', function (req, res) {
    res.render('powerbi');
});

module.exports = router;