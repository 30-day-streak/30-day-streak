const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const challengeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  dailyTarget: {
    description: {
      type: String,
    },
    number: Number,
    unit: String,
  },
  category: {
    type: String,
    eNum: [
      "Eat",
      "Train",
      "Habit",
      "Skill",
      "Other"
    ],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  }
  // reviews: [{
  //   user: {
  //     type: Schema.Types.ObjectId, ref: 'User',
  //     required: true
  //   },
  //   rating: Number,
  //   comment: String
  // }],
  // private: Boolean
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;