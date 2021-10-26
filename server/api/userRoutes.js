const express = require('express');
const createUser = require('../services/createCtrl');
const deleteUser = require('../services/deleteCtrl');

const router = express.Router();

router.post('/user', createUser);
router.delete('/delete:id', deleteUser);

module.exports = router;