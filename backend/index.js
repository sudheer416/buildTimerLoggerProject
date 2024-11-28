// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv= require("dotenv")
// dotenv.config({path:".env"})
// const axios=require("axios")

// const app = express();
// app.use(cors());
// app.use(express.json());
// const getForkTime = require('./utils/getForkTime')
// // Connect to MongoDB
// console.log(process.env.mongoDB_URL)

// mongoose.connect(process.env.mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a schema and model for timer
// const timerSchema = new mongoose.Schema({
//     repo_name:String,
//     assessment_start_time: Date,
//     assessment_end_time: Date,

// });

// const Timer = mongoose.model('Timer', timerSchema);


// app.get('/repos', async (req, res) => { try { const response = await axios.get(`https://api.github.com/users/${username}/repos`); res.json(response.data); } catch (error) { console.error('Error fetching repositories:', error); res.status(500).json({ error: 'Failed to fetch repositories' }); } });

// // Create API endpoints
// app.post('/start', async (req, res) => {

//     const forkTime = await getForkTime(owner, repo, username, accessToken);
//     console.log(forkTime)
//      if (forkTime) {
//          const timer = new Timer({repo_name: forkTime.repo, assessment_start_time: new Date(forkTime.startTime)  });
//           await timer.save(); res.json(timer);
//          }
//          else {
//              res.status(400).json({ error: 'Could not fetch fork time' 

//              });
//              }
// });

// app.post('/complete', async (req, res) => {
//     const timer = await Timer.findOne().sort({ _id: -1 }).exec();
//     timer.assessment_end_time = new Date();
//     await timer.save();
//     res.json(timer);
// });

// app.get('/status', async (req, res) => {
//     const timer = await Timer.findOne().sort({ _id: -1 }).exec();
//     res.json(timer);
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const timerRoutes = require('./routes/timerRoutes');
require('dotenv').config();
const errorHandler = require("./middleware/errorHandler")

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/timer', timerRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
