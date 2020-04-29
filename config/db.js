const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Mongodb Connected");
    } catch (e) {
        console.log(e.message);
        // Exit precess with failure
        process.exit(1);
    }
}

module.exports = connectDB;