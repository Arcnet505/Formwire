const express = require('express');
const router = express.Router();
const bcrpyt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const ObjectID = require('mongodb').ObjectID;

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ username }).then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            username,
            password
        });

        // Create salt and hash password
        bcrpyt.genSalt(10, (err, salt) => {
            bcrpyt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json({
                        user: {
                            id: user.id,
                            username: user.username,
                            level: user.level
                        }
                    });
                });
            });
        });
    });
});

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({ username: 1 })
        .then(users => res.json(users));
});

// @route   GET api/users
// @desc    Get a single user
// @access  Public
router.get('/:id', (req, res) => {
    User.find({ _id: req.params.id }).then(user => {
        res.json(user);
    });
});

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/users/id
// @desc    Update a user
// @access  Private
router.post('/:id', auth, (req, res) => {

    // Simple validation
    if (!req.body.username || !req.body.level) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.update(
        { _id: ObjectID(req.params.id) },
        {
            $set: {
                username: req.body.username,
                level: req.body.level
            }
        }
    )
        .then(() => res.json({ success: true }))
        .catch(
            err => res.status(404).json({ success: false }) && console.log(err)
        );
});

module.exports = router;
