const Food = require('../models/foodData');
const User = require('../models/userData');

exports.addFood = async (req, res) => {
  const { id, name, startTime, expireTime, compartment } = req.body;

  const food = new Food({
    name,
    startTime,
    expireTime
  });

  if (!food) {
    return res.status(404).json({ message: 'Food not found' });
  }

  const user = await User.findById({ _id: id });

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
  const { userId, foodId, compartment } = req.body;

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
  const { id } = req.body;

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
