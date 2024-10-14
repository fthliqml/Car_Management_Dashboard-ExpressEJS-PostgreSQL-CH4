const session = require("express-session");

const sessionMiddleware = session({
    secret: "your-secret", // Ganti dengan kunci rahasia yang aman
    resave: false, // Jangan simpan sesi yang tidak berubah
    saveUninitialized: true, // Simpan sesi baru meskipun tidak ada data
});

module.exports = sessionMiddleware;
