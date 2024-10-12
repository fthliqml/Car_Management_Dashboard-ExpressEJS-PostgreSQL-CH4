const imagekit = require("../lib/imagekit");

const serverUpload = async (req, res, next) => {
    try {
        const file = req.file;
        const splitNameFile = file.originalname.split(".");
        const ext = splitNameFile[splitNameFile.length - 1];
        const fileName = `${file.fieldname}-${splitNameFile[0]}.${ext}`;

        // Upload image into imagekit server
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName,
        });

        if (uploadedImage) {
            // Create object carImage in req.body
            req.body.image = uploadedImage.url;
            next();

            /*
            // Bring uploadedImage's data in response
            res.locals.uploadedImage = uploadedImage;
            */
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Can't find image data",
                isSuccess: false,
                data: null,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = serverUpload;
