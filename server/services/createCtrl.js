const mongoose = require('mongoose');
const User = require('../models/userData');

// create user ops
const createUser = (req, res) => {
    const user = new User({
        firstName: "Robert",
        lastName: "Theguy",
        username: "ThatOneGuy",
        password: "thatPassword",
        refrigerator: [
            {
                name: "Das food item",
                startTime: 42,
                expireTime: 42
            }
        ],
        freezer: [
            {
                name: "Das frozen food item",
                startTime: 43,
                expireTime: 48
            }
        ]
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err
        })
    };

    user.save()
        .then(() => {
            console.log(`This is the then branch: \n ${res}`);
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