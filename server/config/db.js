require('dotenv').config();
const mongoose = require('mongoose');

// const port = process.env.DB_HOST;

mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => console.log(`Error connecting \n${err}`));

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to users database');
}); 

module.exports = db;

