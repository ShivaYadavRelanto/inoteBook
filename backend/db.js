const mongoose = require('mongoose');

// ✅ Make sure the URI starts with "mongodb://"
const mongoURI = "mongodb://localhost:27017/inotebook"; // 'inotebook' is your DB name

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Mongo successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
};

module.exports = connectToMongo;
