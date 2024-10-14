const session = require("express-session");
require("dotenv").config();

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Dont save session that doesnt change
    saveUninitialized: true, // Save session even there is no data
});

module.exports = sessionMiddleware;
