const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    repo_name:{type:String,unique:true},
    assessment_start_time: { type: Date, required: true },
    assessment_end_time: { type: Date },
});

const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;
