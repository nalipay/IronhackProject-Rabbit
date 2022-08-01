require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)


const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

require("./error-handling")(app);



module.exports = app;
