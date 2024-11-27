const express = require('express');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

const authenticate = require('../authenticate');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

// Signup route
router.post('/signup', (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        }
    );
});

// Login route
router.post('/signup', (req, res) => {
    const user = new User({ username: req.body.username });

    User.register(user, req.body.password)
        .then(registeredUser => {
            if (req.body.firstname) {
                registeredUser.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                registeredUser.lastname = req.body.lastname;
            }
            return registeredUser.save();
        })
        .then(() => {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Registration Successful!' });
            });
        })
        .catch(err => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        });
});

// Logout route
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});

module.exports = router;
