const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rewardSchema = new Schema({
  name: {
    type: string,
    required: true
  },
  description: {
    type: string,
    required: true
  },
  category: {
    type: string,
    required: true,
    eNum: [
      "Food",
      "Activity/Experience",
      "Gift",
      "Self-care",
      "Other"
    ]
  },
  url: string
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;