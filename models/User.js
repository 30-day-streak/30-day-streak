const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleID: String,
  firstName: String,
  lastName: String,
  challenges: [{
    id: {
      type: Schema.Types.ObjectId, ref: 'Challenge'
    },
    status: {
      type: String,
      enum: ['active', 'favorite', 'completed', 'withdrawn']
    },
    tracker: [],
    startDate: Date,
    grandPrize: String,
    subGoals7DayStreak: {
      type: Boolean,
      required: true,
      default: false
    },
    subGoals21DayStreak: {
      type: Boolean,
      required: true,
      default: false
    },
    notification15Days: {
      type: Boolean,
      required: true,
      default: false
    },
    notification28Days: {
      type: Boolean,
      required: true,
      default: false
    },
    notificationComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  }],
  rewards: [
    { type: Schema.Types.ObjectId, ref: 'Reward' }
  ],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;