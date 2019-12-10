const express = require('express');
const mysql = require('../pool');
const User = require('../controller/user');
const provider = require('../provider');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('datiStatistici');
});

router.get('/sesso', function(req, res, next) {
    mysql.query(`(select count(id_pazienti) from pazienti where sesso = "M") UNION (select count(id_pazienti) from pazienti where sesso = "F")`, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            var risultato = [];
            for (var i = 0; i < results.length; i++){
                risultato[i]= results[i]['count(id_pazienti)'];
            }
            res.send(JSON.stringify({"status": 200, "error": null, "response": risultato}));
            //If there is no error, all is good and response is 200OK.
        }
    });

});

router.get('/date', function(req, res, next) {
    mysql.query(`select anno from anno`, function (err, anno) {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": anno}));
    });
});

router.get('/sessoPazientiPerData/:anno', function(req, res, next) {
    var anno = req.params.anno;
    mysql.query(`(select count(id_pazienti) from pazienti where anno = ${anno} and sesso = "M") UNION (select count(id_pazienti) from pazienti where anno = ${anno} and sesso = "F")`, function (error, conteggio, fields) {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": "errore", "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            var risultato = [];
            for (var i = 0; i < conteggio.length; i++){
                risultato[i]= conteggio[i]['count(id_pazienti)'];
            }
            res.send(JSON.stringify({"status": 200, "error": null, "response": conteggio,}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

module.exports = router;