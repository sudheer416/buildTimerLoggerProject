const Timer = require('../models/RepoTimer');
const axios = require('axios');
const getForkTime = require("../utils/getForkTime");
const AppError = require('../utils/AppError');
const accessToken="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"
const username="sudheer416"
const repo="buildTimerLogger"
const owner="sudheer416"



// const getForkTime = async (owner, repo) => {
//     try {
//         const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
//         return response.data.created_at;
//     } catch (error) {
//         console.error('Error fetching fork time:', error);
//         throw new Error('Failed to fetch fork time');
//     }
// };

exports.startTimer = async (req, res, next) => {
    try {
      console.log('Fetching fork time...');
      const forkTime = await getForkTime(owner, repo, username, accessToken);
      console.log('Fork time fetched:', forkTime);
  
      const isRepoPresent = await Timer.find({ repo_name: forkTime.repo });
      console.log('Is repo present:', isRepoPresent);
  
      if (isRepoPresent.length === 0) {
        const timer = new Timer({
          repo_name: forkTime.repo,
          assessment_start_time: new Date(forkTime.startTime),
        });
        console.log('Saving new timer:', timer);
        await timer.save();
        console.log('Timer saved:', timer);
        res.json(timer);
      } else {
        console.log('Project already started');
        throw new AppError('Project already started', 400);
      }
    } catch (error) {
      console.log('Error in startTimer:', error);
      next(error);
    }
  };
  
  exports.completeTimer = async (req, res, next) => {
    try {
      const { repo } = req.body;
      console.log('Repo from request:', repo); // Debugging
  
      const timer = await Timer.findOne({ repo_name: repo }).sort({ _id: -1 }).exec();
      console.log('Timer found:', timer); // Debugging
  
      if (!timer) {
        throw new AppError('Give correct repo..', 400);
      }
  
      timer.assessment_end_time = new Date();
      console.log('Updated end time:', timer.assessment_end_time); // Debugging
  
      await timer.save();
      res.json(timer);
      next();
    } catch (error) {
      next(error);
    }
  };
  

exports.getStatus =  async (req, res,next) => {
    console.log("dfdfd gets status")
    const timer = await Timer.findOne().sort({ _id: -1 }).exec();
    console.log(timer)
    res.json(timer);
    next()
}
