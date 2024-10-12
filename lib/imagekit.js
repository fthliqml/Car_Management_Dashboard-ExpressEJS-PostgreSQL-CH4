const Imagekit = require("imagekit");
const dotenv = require("dotenv").config();

const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLICKEY,
    privateKey: process.env.IK_PRIVATEKEY,
    urlEndpoint: process.env.IK_ENDPOINT,
});

module.exports = imagekit;
