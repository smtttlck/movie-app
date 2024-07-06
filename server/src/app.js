const express = require('express');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware to parse json body

app.use(cors()); // allow cross-origin requests from any domain

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads'))); // serve static files from the uploads directory

// api routes
app.use("/api/movie", require("./routes/movieRoutes")); // movie
app.use("/api/actor", require("./routes/actorRoutes")); // actor
app.use("/api/category", require("./routes/categoryRoutes")); // category
app.use("/api/admin", require("./routes/adminRoutes")); // admin

app.use(errorHandler); // error handler

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})