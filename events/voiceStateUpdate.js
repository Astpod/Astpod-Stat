const cfg = require("../config.json")
const client = global.client;
const stat = require("../models/statDatabase")
module.exports = async (oldState, newState) => {
if ((oldState.member) && ((oldState.member.user.bot) || (newState.selfDeaf) || (newState.selfMute))) return;

if ((!oldState.channelID) && (newState.channelID)) {
 client.VoiceMap.set(oldState.id, {
    channel: newState.channelID,
    time: Date.now()
});
}
if (!client.VoiceMap.has(oldState.id)) client.VoiceMap.set(oldState.id, {
    channel: newState.channelID,
    time: Date.now()
});

let Veri = client.VoiceMap.get(oldState.id);
let Time = Number(Date.now() - Veri.time);

if ((oldState.channelID) && (!newState.channelID)) {
  await stat.findOneAndUpdate({ guildID: newState.guild.id, userID: newState.member.id }, { $inc: { voice: Time, dailyVoice: Time, weekVoice: Time } }, { upsert: true });
  client.VoiceMap.delete(oldState.id);
} else if ((oldState.channelID) && (newState.channelID)) {
  await stat.findOneAndUpdate({ guildID: newState.guild.id, userID: newState.member.id }, { $inc: { voice: Time, dailyVoice: Time, weekVoice: Time } }, { upsert: true });
  client.VoiceMap.set(oldState.id, {
    channel: newState.channelID,
    time: Date.now()
});
};
}
module.exports.configuration = {
  name: "voiceStateUpdate"
}
