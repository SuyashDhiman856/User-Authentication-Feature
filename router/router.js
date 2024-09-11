const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/logout', (req, res) => {
    try{
        req.session.destroy(() => {
            res.sendFile(path.join(__dirname, '../public/logout.html'));
        });
    }
    catch(error)
    {
        console.log(error);
        res.send("Not Logged In");
    }
});

router.get('/css/:css', (req, res) => {
    res.sendFile(path.join(__dirname, `../static/css/${req.params.css}.css`));
})

module.exports = router;