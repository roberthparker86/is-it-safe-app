const addFood = require('../server/services/addFoodCtrl');

const addFoodValidate = (req, res) => {
  const data = req.body,
    // input expected data type in string format and data to check. Returns true if data is of type
    validateType = (expected, actual) => (expected === typeof actual);
  let message = '';

  console.log(data);

  for (key in data) {

    console.log(key);
    
    if ( key === "startTime" || key === "expireTime" ) {

      let convertedString = Number(data[key]);

      if ( convertedString.toString() === 'NaN' ) {
        message = `${key} must be a number`;
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

  if (message !== '') {

    return res.status(400).send(message);
  }
  
  return res.send('validated');
};

module.exports = addFoodValidate;