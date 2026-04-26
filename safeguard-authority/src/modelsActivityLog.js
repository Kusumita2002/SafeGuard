// models/ActivityLog.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // use String or ObjectId as you prefer
  type: {
    type: String,
    enum: ['video_call', 'gps', 'message', 'voice_sos', 'ai_assistant'],
    required: true,
  },
  details: { type: Object },        // extra info (message text, location, etc.)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
