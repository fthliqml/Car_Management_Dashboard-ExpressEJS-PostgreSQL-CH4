const express = require("express");
const path = require("path");
const route = require("./routes/routes");

const app = express();
const port = 3000;

// app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Ping successfully",
            isSuccess: true,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Ping failed",
            isSuccess: false,
            error: error.message,
        });
    }
});

app.use(route);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
