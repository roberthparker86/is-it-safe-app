const jwt = require('jsonwebtoken');
const Food = require('../models/foodData');
const User = require('../models/userData');

exports.addFood = async (req, res) => {
  const { foodName: name, startDate: startTime, expiryDate: expireTime, compartment } = req.body,
    token = req.cookies.token,
    _ID = req.cookies.user;

  console.log(req.body);

  if (!token) return res
    .status(401)
    .json({ 
      success: false,
      error: 'Access denied. No token provided.'
    });

  if (!_ID) return res
    .status(404)
    .json({ 
      success: false,
      error: 'No ID found.'
    });
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ 
        success: false,
        error: 'Access denied. Invalid token.'
      });
  } 

  const food = new Food({
    name,
    startTime,
    expireTime
  });

  if (!food) {
    return res.status(404).json({ message: 'Food not found' });
  }

  const user = await User.findById({ _id: _ID });

  if (compartment === 'refrigerator') {
    user.refrigerator.push(food);
  } else if (compartment === 'freezer') {
    user.freezer.push(food);
  } else {
    throw new Error('Compartment not found');
  }

  const result = await user.save();

  if (!result) {
    return res.status(404).json({
      message: 'Food not added'
    });
  }

  return res.status(200).json({
    message: 'Food added',
    data: result
  });
};

exports.deleteFood = async (req, res) => {
  const { userId, foodId, compartment } = req.body,
    token = req.cookies.token;

  if (!token) return res
    .status(401)
    .json({ success: false })
    .send({ error: 'Access denied. No token provided.' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ success: false })
      .send({ error: 'Access denied. Invalid token.' });
  } 

  const user = await User.findById({
    _id: userId
  });

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  if (compartment === 'freezer') {
    user.freezer.pull(foodId);
  } else if (compartment === 'refrigerator') {
    user.refrigerator.pull(foodId);
  } else {
    return res.status(404).json({
      message: 'Compartment not found'
    });
  }

  const result = await user.save();

  if (!result) {
    return res.status(404).json({
      message: 'No result returned. Food not deleted'
    });
  }

  return res.status(200).json({
    message: 'Food deleted',
    data: {
      id: result._id,
      email: result.email,
      firstName: result.firstName,
      freezer: result.freezer,
      lastName: result.lastName,
      refrigerator: result.refrigerator
    }
  });
};

exports.getFood = async (req, res) => {
  const { id } = req.body,
    token = req.cookies.token,
    _ID = req.cookies.user;

  console.log(_ID);

  if (!token) return res
    .status(401)
    .json({ success: false })
    .send({ error: 'Access denied. No token provided.' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ success: false })
      .send({ error: 'Access denied. Invalid token.' });
  } 

  const user = await User.findById({ _id: id });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.status(200).json({
    data: {
      freezer: user.freezer,
      refrigerator: user.refrigerator
    }
  });
};
