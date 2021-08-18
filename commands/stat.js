const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const stats = require("../models/statDatabase.js")
const pareTime = client.pareTime

module.exports.execute = async (client, message, args, embed) => {
  let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Database = await stats.findOne({guildID: message.guild.id, userID: member.user.id})

    embed.setDescription(`${member} (${member.roles.hoist || member.roles.highest}) kişi'nin stat verileri.`)
    embed.addFields(
      {name: `${cfg.stars} Toplam Mesaj`, value: `\`\`\`${Database ? Database.messages : 0}\`\`\``, inline: true},
      {name: `${cfg.stars} Günlük Mesaj`, value: `\`\`\`${Database ? Database.dailyMessages : 0}\`\`\``, inline: true},
      {name: `${cfg.stars} Haftalık Mesaj`, value: `\`\`\`${Database ? Database.week : 0}\`\`\``, inline: true},
      {name: `${cfg.stars} Toplam Ses`, value: `\`\`\`${client.format(Database ? Database.voice : 0)}\`\`\``, inline: true},
      {name: `${cfg.stars} Günlük Ses`, value: `\`\`\`${client.format(Database ? Database.dailyVoice : 0)}\`\`\``, inline: true},
      {name: `${cfg.stars} Haftalık Ses`, value: `\`\`\`${client.format(Database ? Database.weekVoice : 0)}\`\`\``, inline: true},
    )
    message.channel.send(embed)

};
module.exports.configuration = {
  name: "stat",
  aliases: ["me", "stats"],
};