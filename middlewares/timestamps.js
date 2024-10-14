// local date
const date = new Date().toString();

function createCarTime(req, res, next) {
    req.body.createdAt = date;
    req.body.updatedAt = date;

    next();
}

module.exports = createCarTime;
