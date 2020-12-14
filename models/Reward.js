const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    eNum: [
      "Food",
      "Activity/Experience",
      "Gift",
      "Self-care",
      "Other"
    ]
  },
  url: String
}, {
  timestamps: true
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;