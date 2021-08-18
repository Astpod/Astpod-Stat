const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const stats = require("../models/statDatabase.js")
const pareTime = client.pareTime

module.exports.execute = async (client, message, args, embed) => {

    const Database = await stats.find({ guildID: message.guild.id })

    const voiceList = Database.filter(x => (x) && (x.voice) !== 0).sort((x, y) => (y.voice) - (x.voice)).map((val, i) => `\`${i+ 1}.\` ${message.guild.members.cache.get(val.userID)} - (\`${client.format(val.voice)}\`)`).splice(0, 5);
    const messageList = Database.filter(x => (x) && (x.messages) !== 0).sort((x, y) => (y.messages) - (x.messages)).map((val, i) => `\`${i+ 1}.\` ${message.guild.members.cache.get(val.userID)} - (\`${val.messages} mesaj\`)`).splice(0, 5);

    embed.setDescription(`**Sunucumuzun toplam stat verileri.**`)
    embed.addFields(
      {name: `${cfg.stars} **Top 5 Mesaj**`, value: `${messageList.join("\n") || "Sunucumuzda toplam mesaj verileri bulunmuyor."}`, inline: true},
      {name: `${cfg.stars} **Top 5 Ses**`, value: `${voiceList.join("\n") || "Sunucumuzda toplam ses verileri bulunmuyor."}`, inline: true},
    )
    message.channel.send(embed)

};
module.exports.configuration = {
  name: "top",
  aliases: ["top"],
};