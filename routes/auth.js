const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');

// захищений роут, тільки авторизованим
// auth/
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login user & get token
// route:  /auth
router.post('/', [
    // перевіряємо кожне поле, яке вводить користувач на певні умови
    check('username', 'Name is required')
        .not()
        .isEmpty(),
    check(
        'password',
        'Password is required'
    ).exists()
], async (req, res) => {
    // перевірка чи є помилки
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {username, password} = req.body;
    try {
        // перерівка чи є в БД вже користувач з таким username
        let user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }


        //jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;