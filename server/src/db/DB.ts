const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const disconnectFromDatabase = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB disconnected");
    } catch (error) {
        console.error("MongoDB disconnection error:", error);
    }
};

module.exports = {
    connectToDatabase,
    disconnectFromDatabase,
};
