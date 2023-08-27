// database.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: process.env.MONGODB_URI,
    secret: 'LlstU86uBdCGX18B'
};