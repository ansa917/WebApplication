const express = require('express');
const router = express.Router();
const checkPassMiddleware = require('../middleware/checkPassword.js');
let message ="";

router.get('/failed', (req, res) => {
    message = "failed to login";
    res.redirect('/');
});

router.get('/logged-out', (req, res) => {
    message = "Logged out";
    res.redirect('/');
});


router.get('/', (req, res) => {
    const currentMessage = message;
    message = "";
    res.render('login', {message:currentMessage});
});

router.post('/',checkPassMiddleware, (req, res) => {
    res.redirect('/');
});

module.exports = router;