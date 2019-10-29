const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Client Model
const Client = require('../../models/Client');

// @route   GET api/clients
// @desc    Get all clients
// @access  Public
router.get('/', (req, res) => {
    Client.find()
        .sort({ clientID: 1 })
        .then(clients => res.json(clients));
});

// @route   GET api/clients
// @desc    Get a single client
// @access  Public
router.get('/:id', (req, res) => {
    Client.find({ clientID: req.params.id }).then(client => {
        res.json(client);
    });
});

// @route   POST api/client
// @desc    Create new client
// @access  Private
router.post('/', auth, (req, res) => {
    // Simple validation
    if (req.body.clientID == '') {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newClient = new Client({
        clientID: req.body.clientID,
        dob: req.body.dob,
        formResults: []
    });

    newClient.save().then(client => res.json(client));
});

// @route   POST api/clients
// @desc    Add form to client
// @access  Private
router.post('/:id', auth, (req, res) => {

    // Simple validation
    if (!req.body.formID || !req.body.formData) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    Client.update(
        { clientID: req.params.id },
        {
            $push: {
                formResults: {
                    $each: [
                        {
                            formID: req.body.formID,
                            formName: req.body.formName,
                            formData: req.body.formData,
                            formDate: req.body.formDate
                        }
                    ]
                }
            }
        }
    )
        .then(() => res.json({ success: true }))
        .catch(
            err => res.status(404).json({ success: false }) && console.log(err)
        );
});

// @route   DELETE api/clients
// @desc    Delete a client
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Client.findById(req.params.id)
        .then(client => client.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
