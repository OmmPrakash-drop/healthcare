const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['weekdays-morning', 'weekdays-afternoon', 'weekdays-evening', 'weekends-morning', 'weekends-afternoon', 'weekends-evening', 'flexible']
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);