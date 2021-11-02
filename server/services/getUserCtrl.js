const User = require('../models/userData');

// get User ops
const getUser = async (req, res) => {
    await User.findOne({username: req.params.username}, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    }).catch(err => console.log(err));
};

module.exports = getUser;