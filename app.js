const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const path = require("path");
const methodOverride = require("method-override");
const route = require("./routes/routes");
const session = require("./middlewares/session");

const app = express();
const port = 3000;

// Reading static files in spesific folder
app.use(express.static(__dirname + "/public"));
// Set the view engine to ejs
app.set("view engine", "ejs");
// Custom "views" folder path (express-layouts automatically set this views by default)
app.set("views", path.join(__dirname, "/views"));
// Using ejs layouting
app.use(expressLayouts);
// Reading json request from client
app.use(express.json());
// Get request object (in this case, form in createCar)
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Override method in form
app.use(methodOverride("_method"));
// Middleware to save session
app.use(session);
// Sending message between request
app.use(flash());

// Health check
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

// Routing
app.use("/cars", route);

// Running server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
