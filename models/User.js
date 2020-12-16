const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { 
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
  },
  googleId: String,
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
    grandPrize: String
  }],
  rewards: [{type: Schema.Types.ObjectId, ref: 'Reward'}],
  subGoals7DayStreak: boolean,
  subGoal21DayStreak: boolean,
  notification15days:boolean,
  notification28Days:boolean,
  notificationComplete:boolean
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;