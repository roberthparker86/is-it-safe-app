const addFood = require('../server/controllers/addFoodCtrl');

const addFoodValidate = (req, res) => {

  const data = req.body;
  
  let message = '';

  for (key in data) {
    
    if ( key === "startTime" || key === "expireTime" ) {

      let convertedString = Number(data[key]);

      if ( (convertedString.toString() === 'NaN') || (convertedString <= 0) ) {

        message = `${key} must be a number greater than 0`;
        return res.status(400).send({ message });
      } 
    }

    if ( (key === 'name') && (typeof data[key] !== 'string') ) {

      message = `${key} must be a string`;
      return res.status(400).send({ message });
    }
    
    if ( (key === 'compartment') && (data[key] !== 'refrigerator') && (data[key] !== 'freezer') ) {

      message = `${key} must be either refrigerator or freezer`;
      return res.status(400).send({ message });
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