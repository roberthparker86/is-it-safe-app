const mongoose = require('mongoose');
const Food = require('../models/foodData');
const User = require('../models/userData');

const addFood = async (req, res) => {
	const {
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
		_id: req.params.id
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

module.exports = addFood;