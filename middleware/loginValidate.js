const getUser = require('../server/controllers/getUserCtrl');

const loginValidate = (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    email: req.body.email,
    password: req.body.password,
  });
}

module.exports = loginValidate;