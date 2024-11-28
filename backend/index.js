const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const timerRoutes = require('./routes/timerRoutes');
require('dotenv').config();
const errorHandler = require("./middleware/errorHandler")
const AppError =require("./utils/AppError")
const app = express();

app.use(cors(
    {
        origin: ["https://build-timer-logger-project"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());

connectDB();

app.use('/', timerRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.all("*",(req,res,next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server`))
})

app.use(errorHandler);
