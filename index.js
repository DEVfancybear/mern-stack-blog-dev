const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors')

const app = express();
//Connect database
connectDB();
app.get("/", (req, res) => res.send("Welcome to database"));
// Unlock all cors
app.use(cors());
// Init Middleware
app.use(express.json({ extended: false }));
//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


