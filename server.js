const express = require("express");
const compression = require("compression");
const apiRoutes = require("./routes/API");
const htmlRoutes = require("./routes/HTML");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 6900;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./db/public"));
app.use(compression());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
