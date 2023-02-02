const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
require('./connection/connection');
const register = require('./route/register');
const login = require('./route/login');

app.use(express.json());
app.use(cors())
app.use(register);
app.use(login);

const port = process.env.port;
app.listen(port, console.log(`Server is up at port ${port}`))