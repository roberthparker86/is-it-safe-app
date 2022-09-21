const { body } = require('express-validator');

exports.addFoodValidator = [
	
	body('id')
		.exists({ checkFalsy: true })
		.withMessage('Invalid inputs: must be a string of valid characters.'),
	body('name')
		.custom((name, { req }) => {
			return (name !== '' && name !== 'NaN' && name !== '[]' && name !== '0' );
		})
		.withMessage('Invalid input: must be a string of valid characters.'),
	body('startTime')
		.isString()
		.withMessage('Invalid input: must be a string in date format.'),
	body('expireTime')
		.isString()
		.withMessage('Invalid input: must be a string in date format.'),
	body('compartment')
		.custom((compartment, { req }) => {
			return (compartment === 'freezer' || compartment === 'refrigerator');	
		})
		.withMessage('Invalid input: must be "freezer" or "regrigerator".')
];