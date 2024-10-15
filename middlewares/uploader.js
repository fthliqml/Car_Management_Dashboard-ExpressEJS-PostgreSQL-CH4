const imagekit = require("../lib/imagekit");

const serverUpload = async (req, res, next) => {
    const file = req.file;
    // If no file uploaded
    if (!file) return next();

    try {
        const splitNameFile = file.originalname.split(".");
        const ext = splitNameFile[splitNameFile.length - 1];
        const fileName = `${file.fieldname}-${splitNameFile[0]}.${ext}`;

        // Upload image into imagekit server
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName,
        });

        if (uploadedImage) {
            // Create object image url in req.body
            req.body.image = uploadedImage.url;
            next();

            /*
            // Bring uploadedImage's data in response (just in 1 request)
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
