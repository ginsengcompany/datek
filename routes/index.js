const express = require('express');
const mysql = require('../pool');
const User = require('../controller/user');
const provider = require('../provider');
const router = express.Router();

const user = new User();


router.get('/', function(req, res, next) {
    let user = req.session.user;
    if(user){
        res.redirect('/home');
        return;
    }
  res.render('index');
});

router.get('/login', function (req, res, next) {
   res.render('index')
});

router.get('/signup', function (req,res, next) {
    res.render('register');
});

router.get('/home', function (req, res, next) {
    let user = req.session.user;
    if(user){
        res.render('home', {name: user.username});
        return;
    }

    res.redirect('/');
});

//POST Login
router.post('/login', function (req, res, next) {
    user.login(req.body.username, req.body.password, function (result) {
        if(result){
            req.session.user = result;
            res.redirect('/home');
        }else{
            res.send('Username/Password errata o Utente non attivo !');
        }
    });
});

//POST Signup
router.post('/signup', function (req, res, next) {
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    user.create(userInput, async function (email) {
        if(email != null){
            await provider.invioMail(email, 'Conferma account', `<a href= "http://localhost:3000/conferma?email=${email}">Link per confermare l'account</a>`)
            res.redirect('/');
        }else{
            res.render('register', {message: 'Username già esistente'});
        }
    });
});

// GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

//GET /reset
router.get('/reset', function (req, res, next) {
   res.render('reset');
});

//POST /reset
router.post('/reset', async function (req, res, next) {
    const email = req.body.email;
    await provider.invioMail(email, 'Reset password', `<a href= "http://localhost:3000/newpassword?email=${email}">Link per resettare la pssword</a>`);
    res.redirect('/');
});

//GET newPassword
router.get('/newpassword', function (req, res, next) {
    const email = req.query.email;
    res.render('newPassword', {email: email});
});

//POST newPassword
router.post('/newpassword', function (req, res, next) {
    const email = req.query.email;
    const password = req.body.password;
    user.newPassword(email, password, function (err) {
        console.log(err);
        res.redirect('/');
    });
});

//GET /conferma
router.get('/conferma', function (req, res, next) {
    const email = req.query.email;
    user.active(email, function (err) {
       console.log(err);
       res.redirect('/');
    });
});

router.get('/home/sesso', function(req, res, next) {
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

router.get('/home/date', function(req, res, next) {
    mysql.query(`select anno from anno`, function (err, anno) {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": anno}));
    });
});

router.get('/home/sessoPazientiPerData/:anno', function(req, res, next) {
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

router.get('/home/apriprogramma', function(req, res, next) {
    var exec = require('child_process').execFile;

    var fun =function(){
        console.log("fun() start");
        exec('C:\\Program Files\\MATLAB\\R2018b\\bin\\matlab', function(err, data) {
            console.log(err)
            console.log(data.toString());
        });
    }
    fun();

});


module.exports = router;
