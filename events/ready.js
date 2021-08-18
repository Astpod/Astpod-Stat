const cfg = require("../config.json")
const client = global.client;
const { CronJob } = require("cron");
const stat = require("../models/statDatabase")

module.exports = () => {
  console.log("Bot aktif!");
  setInterval(() => {
  const reloadStatus = Math.floor(Math.random() * (cfg.status.length));
  client.user.setActivity(`${cfg.status[reloadStatus]}`);
  }, 60000)
  const x = client.channels.cache.get(cfg.sesKanalı)
  if(x) x.join().catch(err => console.log("Ses Kanalına Bağlanamadı."))

  const guild = client.guilds.cache.get(cfg.sunucuID)

  const daily = new CronJob("00 00 00 * * *", async () => {
      await stat.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyMessages: 0, dailyVoice: 0 }});
  }, null, true, "Europe/Istanbul");
  daily.start();

  const week = new CronJob("00 00 00 * * 0", async () => {
      await stat.findOneAndUpdate({ guildID: guild.id }, { $set: { week: 0, weekVoice: 0 }});
  }, null, true, "Europe/Istanbul");
  week.start();

}
module.exports.configuration = {
  name: "ready"
}