const cfg = require("../config.json")
const client = global.client;
const stat = require("../models/statDatabase")
module.exports = async (message) => {
const prefix = message.content.toLowerCase().startsWith(cfg.prefix)
if (message.author.bot || !message.guild || prefix) return;
if(message.channel.id == cfg.chat) {
  await stat.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { totalChatStats: 1, dailyMessages: 1, week: 1 } }, { upsert: true });
} if(message.channel.id == cfg.kayıt) {
  await stat.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { totalKayıtStats: 1, dailyMessages: 1, week: 1 } }, { upsert: true });
}
await stat.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { messages: 1, dailyMessages: 1, week: 1 } }, { upsert: true });
}
module.exports.configuration = {
  name: "message"
}
