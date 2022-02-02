const mongoose = require('mongoose');
const Food = require('../models/foodData');
const User = require('../models/userData');

exports.addFood = async (req, res) => {

	const {
    id,
		name,
		startTime,
		expireTime,
		compartment
	} = req.body;

	const food = new Food({
		name,
		startTime,
		expireTime
	});

	if (!food) {
		return res.status(404).json({
			message: 'Food not found',
		});
	}

	const user = await User.findById({
		_id: id
	});

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
			message: 'Food not added',
		});
	}

	return res.status(200).json({
		message: 'Food added',
		data: result
	});
};

exports.deleteFood = async (req, res) => {

  const {
    userId,
    foodId,
    compartment
  } = req.body;

  const user = await User.findById({
    _id: userId
  })

  const userArray = user[compartment];

  userArray.pull(foodId);
  user.markModified(compartment);

  const result = await user.save();

  if (!result) {
    return res.status(404).json({
      message: 'Error, food not deleted',
    });
  }

  return res.status(200).json({
    message: 'Food deleted',
    data: result
  });
};