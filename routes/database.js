let express = require('express');
let router = express.Router();
let connection = require('../pool');

router.get('/', function (req, res) {
            res.render('database');
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

router.get('/asl', function(req, res, next) {
    connection.query('SELECT * from asl', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/biomonitoraggio', function(req, res, next) {
    connection.query('SELECT * from biomonitoraggio', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/comunebiomonitoraggio', function(req, res, next) {
    connection.query('SELECT * from comune_biomonitoraggio', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/comuneresidenza', function(req, res, next) {
    connection.query('SELECT * from comune_residenza', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});
router.get('/diagnosi', function(req, res, next) {
    connection.query('SELECT * from diagnosi', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/postazioniarpac/:anno', function(req, res, next) {
    let anno = req.params.anno;
    connection.query(`SELECT * from postazioni_arpac WHERE anno = ${anno}`, function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/stella/:id_diagnosi/:id_asl/:id_postazioni_arpac/:idcomune_residenza/:idanno', function(req, res, next) {
    let idDiagnosi = req.params.id_diagnosi;
    let idAsl = req.params.id_asl;
    let idPostazioni = req.params.id_postazioni_arpac;
    let idComune = req.params.idcomune_residenza;
    let idAnno = req.params.idanno;
    connection.query(`SELECT * from pazienti INNER JOIN (SELECT id_paziente FROM stella WHERE id_diagnosi = ${idDiagnosi} AND id_asl = ${idAsl} AND id_postazioni = ${idPostazioni} AND id_comune = ${idComune} AND id_anno = ${idAnno}) AS t1 ON pazienti.id_pazienti = t1.id_paziente`, function (error, results, fields) {
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