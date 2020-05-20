
// yarn add express body-parser cookie-parser morgan cors
// yarn add --dev nodemon
const express = require('express');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);

module.exports = app;
