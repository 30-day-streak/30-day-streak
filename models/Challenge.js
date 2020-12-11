const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const challengeSchema = new Schema({
  title: {
    type: string,
    required: true
  },
  goal: {
    type: string,
    required: true
  },
  dailyTarget: {
    required: true,
    description: {
      type: string,
      required: true
    },
    number: number,
    unit: string,
  },
  category: {
    type: string,
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
  //   rating: number,
  //   comment: string
  // }],
  // private: boolean
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;