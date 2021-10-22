require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { response } = require('express');
// const db = require('./db/index.js');

const app = express();

let port = process.env.PORT;
if (port === null || port === "") {
    port = 3000;
}

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Client successfully connected. WOOT');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));