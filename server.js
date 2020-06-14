const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT | 3000;
const app = express();
const server = app.listen(PORT);

app.use(express.static('public'));

console.log("Server is running on port "+PORT);
