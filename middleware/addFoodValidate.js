const addFood = require('../server/controllers/addFoodCtrl');

const addFoodValidate = (req, res) => {
  const data = req.body,
    // input expected data type in string format and data to check. Returns true if data is of type
    validateType = (expected, actual) => (expected === typeof actual);
  let message = '';

  for (key in data) {
    
    if ( key === "startTime" || key === "expireTime" ) {

      let convertedString = Number(data[key]);

      if ( (convertedString.toString() === 'NaN') || (convertedString <= 0) ) {
        message = `${key} must be a number greater than 0`;
        return res.status(400).send({ message });
      } 
    }

    if ( key === 'name') {
      
      if (typeof data[key] !== 'string') {
        message = `${key} must be a string`;
        return res.status(400).send({ message });
      }
    }
    
    if ( key === 'compartment') {

      if (data[key] !== 'refrigerator' && data[key] !== 'freezer' ) {
        message = `${key} must be either refrigerator or freezer`;
        return res.status(400).send({ message });
      }
    }
  };

  if ( Number(data.startTime) >= Number(data.expireTime) ) {
    message = `startTime must be less than expireTime`;
    return res.status(400).send({ message });
  }

  if (message !== '') {
    return res.status(400).send(message);
  }
  
  return addFood(req, res);
};

module.exports = addFoodValidate;