const mongoose = require('mongoose');
const User = require('../models/userData');

// create user ops
const createUser = (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        refrigerator: [],
        freezer: []
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err
        })
    };

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'user created'
            });
        })
        .catch((err) => {
            console.log(`This is the catch branch: \n ${err}`);
            return res.status(400).json({
                err,
                message: 'User not created'
            });
        });
};

module.exports = createUser;