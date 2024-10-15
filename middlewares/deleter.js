const imagekit = require("../lib/imagekit");

const serverDelete = async (req, res, next) => {
    try {
        // Delete file from image kit server
        await imagekit.deleteFile(res.locals.fileId);
        // Send no content, response of fetch in update-car.js will reload the page
        res.status(200).send();
    } catch (error) {
        console.error(error);
    }
};

module.exports = serverDelete;
