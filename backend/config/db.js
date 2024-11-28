const mongoose = require('mongoose');
const URL="mongodb+srv://gantisudheer416:Sudheer@cluster0.z2ejf.mongodb.net/BuildTimerLogger"

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
