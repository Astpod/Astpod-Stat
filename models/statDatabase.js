const mongoose = require("mongoose");

const stats = mongoose.Schema({
  guildID: String,
  userID: String,
  messages: Number,
  dailyMessages: Number,
  week: Number,
  voice: Number,
  dailyVoice: Number,
  weekVoice: Number,
  totalVoiceStats: Number,
  totalChatStats: Number,
  totalKayıtStats: Number
});

module.exports = mongoose.model("stats", stats);
