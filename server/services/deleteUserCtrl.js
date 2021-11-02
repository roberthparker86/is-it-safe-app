const User = require('../models/userData');

// delete user ops
const deleteUser = async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id }, (err, user) => {
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

module.exports = deleteUser;