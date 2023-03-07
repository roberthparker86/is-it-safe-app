const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// routes
const userAuthRoutes = require('./routes/userAuthRoutes');
const userOpsRoutes = require('./routes/userOpsRoutes');
// const jwt = require('express-jwt');

// const jwtParams = {
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
//   getToken: req => req.cookies.token
// };

const app = express();

// Avoid deprecation warning for mongoose
mongoose.set('useCreateIndex', true);

const dbURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-pw7t6fx-shard-00-00.81fes9c.mongodb.net:27017,ac-pw7t6fx-shard-00-01.81fes9c.mongodb.net:27017,ac-pw7t6fx-shard-00-02.81fes9c.mongodb.net:27017/?ssl=true&replicaSet=atlas-139i19-shard-0&authSource=admin&retryWrites=true&w=majority`;

// database connect
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Users database connected"))
  .catch((err) => console.log(err));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// Set home route
app.get('/', (req, res) => {
  res.send('Client successfully connected. WOOT');
});

// Set api auth routes
app.use('/api', userAuthRoutes);

// Set general application use routes
app.use('/api', userOpsRoutes);

let port = process.env.PORT || 3000;

app.listen( port, () => console.log(`Server is running on port ${port}`) );