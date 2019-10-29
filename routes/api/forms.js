const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Form Model
const Form = require('../../models/Form');

// @route   GET api/forms
// @desc    Get all forms
// @access  Public
router.get('/', (req, res) => {
    Form.find()
        .sort({ name: 1 })
        .then(forms => res.json(forms));
});

// @route   POST api/forms
// @desc    Create new form
// @access  Private
router.post('/', auth, (req, res) => {
    Form.find({ name: req.body.name }).then(form => {
        if (form)
            return res
                .status(400)
                .json({
                    msg:
                        'Form already exists. Please enter a new name or delete the old form.'
                });
    });

    const newForm = new Form({
        name: req.body.name,
        form: req.body.form
    });

    newForm.save().then(form => res.json(form));
});

// @route   DELETE api/forms
// @desc    Delete a form
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Form.findById(req.params.id)
        .then(form => form.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
