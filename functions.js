const { Discord, Client, MessageEmbed, TextChannel, Collection } = require("discord.js")
const Webhooklar = {}
const parsems = require("parse-ms");

module.exports = (client, cfg, moment) => {


client.parseTime = time => {
    var x = "";
    var y = parsems(time);
    if (y.days !== 0) {
      x = `${y.days} gün ${y.hours} saat ${y.minutes} dakika ${y.seconds} saniye`;
    } else if (y.hours !== 0) {
      x = `${y.hours} saat ${y.minutes} dakika ${y.seconds} saniye`;
    } else if (y.minutes !== 0) {
      x = `${y.minutes} dakika ${y.seconds} saniye`;
    } else if (y.seconds !== 0) {
      x = `${y.seconds} saniye`;
    };
    return x;
};

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

client.getRandomInt = (min, max) => {
    (min = Number(min)), (max = Number(max));
    return min + Math.floor((max - min) * Math.random());
};

client.toDate = date => {
    return new Date(date).toLocaleString("tr-TR", { hour12: false, timeZone: "Europe/Istanbul"}).replace(",", "");
};
 
client.format = sure => {
    return moment.duration(sure).format("H [saat] m [dk.]");
};
  
 
client.moment = sure => {
    return moment(sure).format("HH:mm:ss");
};
  
client.getDate = (date, type) => {
    let sure;
    date = Number(date);
    if (type === "saniye") { sure = (date * 1000) }
    else if (type === "dakika") { sure = (60 * 1000) * date }
    else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
    else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
    else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
    else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
    else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
    return sure;
};
  
Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
};
  
TextChannel.prototype.wsend = async function (content, options) {
  if (Webhooklar[this.id]) return (await Webhooklar[this.id].send(content, options));
  let entegrasyonlar = await this.fetchWebhooks();
  let webh = entegrasyonlar.find(e => e.name == client.user.username),
    result;
  if (!webh) {
    webh = await this.createWebhook(client.user.username, {
      avatar: client.user.avatarURL()
    });
    Webhooklar[this.id] = webh;
    result = await webh.send(content, options);
  } else {
    Webhooklar[this.id] = webh;
    result = await webh.send(content, options);
  }
  return result;
};

client.chunkArray = (arr, chunkSize) => {
    const chunks = [];
    let currentChunk = [];
    for (let i = 0; i < arr.length; i++) {
      currentChunk.push(arr[i]);
      if ((i !== 0 && i % chunkSize === 0) || i === arr.length - 1) {
        chunks.push(currentChunk);
        currentChunk = [];
      };
    };
    return chunks;
};

Array.prototype.chunk = function(chunk_size) {
    let myArray = Array.from(this);
    let tempArray = [];
    for (let index = 0; index < myArray.length; index += chunk_size) {
      let chunk = myArray.slice(index, index + chunk_size);
      tempArray.push(chunk);
    };
    return tempArray;
  };

  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      };
    };
   return this;
  };  
};