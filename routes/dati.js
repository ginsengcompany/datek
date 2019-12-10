let express = require('express');
let router = express.Router();
let connection = require('../pool');
let fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dati');
});

router.get('/anno', function(req, res, next) {
    connection.query('SELECT * from anno', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/inquinanti', function(req, res, next) {
    connection.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = \'cosa\' AND TABLE_NAME = \'postazioni_arpac\';', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/inquinante/:anno/:inquinante/', function(req, res, next) {
    let anno = req.params.anno;
    let inquinante = req.params.inquinante;
    connection.query(`SELECT postazioni, ${inquinante} AS value, latitudine, longitudine from postazioni_arpac WHERE anno = ${anno} `, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});


module.exports = router;
