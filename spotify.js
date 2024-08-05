const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ms = require('ms');
const moment = require('moment');
module.exports = {
  name: `spotify`,
  description: `Shows what user listen for`,
  usage: `h?spotify`,
  example: `h?spotify`,
  category: `Information`,
  run: async(lb, lbargs, bot, Discord) => {
try {
    let user = lb.guild.members.cache.get(lb.author.id);
if(user.presence.activities[0] && user.presence.activities[0].name === 'Spotify') act = user.presence.activities[0];
  if(user.presence.activities[1] && user.presence.activities[1].name === 'Spotify') act = user.presence.activities[1];
   if(!act || act === null || act.name !== 'Spotify' && act.type !== 'LISTENING') return lb.reply(`**This user dosen't playing music on spotify**`);
    if(act.name === 'Spotify' && act.type === 'LISTENING') {
      if(act.assets.largeText === act.details || null || undefined) act.assets.largeText = act.details;
      let song = {
        title: act.details,
        album: act.assets.largeText,
        artist: act.state,
        url: `https://open.spotify.com/track/${act.syncId}`,
        image: `https://i.scdn.co/image/${act.assets.largeImage.slice(8)}`,
        start: act.timestamps.start.getTime(),
        end: act.timestamps.end.getTime(),
      };
    let row = new MessageActionRow()
      .addComponents(
     new MessageButton()
    .setLabel('Play ' + act.details + ' On Spotify')
.setStyle('LINK')
.setURL(song.url)
      )
  const Canvas = require('canvas');
       const canvas = Canvas.createCanvas(600, 150);
      const total = song.end - song.start;
        const progress = Date.now() - song.start;
      const startin = format(progress > total ? total : progress);
        const endin = format(total);
  if(startin === endin) return lb.reply('**The song you are listening to is already ended 🙄**');
      const ctx = canvas.getContext('2d');
       ctx.rect(0, 0, canvas.width, canvas.height);
       ctx.fillStyle = "#18191b"
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       let img = await Canvas.loadImage(song.image);
       ctx.drawImage(img, 30, 15, 120, 120)
       Canvas.registerFont('Cairo-Bold.ttf', { family: 'Cairo-bold', weight: 'bold' });
       Canvas.registerFont('Cairo-Regular.ttf', { family: 'Cairo-regular', weight: 'regular' })
       ctx.font = '16px Cairo-bold';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${short(song.title, 30)}`, 162, 44);
       ctx.font = '14px Cairo-regular';
       ctx.fillText(`By ${short(song.artist, 40)}`, 162, 67);
       ctx.font = '14px Cairo-regular';
       ctx.fillText(`On ${short(song.album, 40)}`, 162, 85);
       ctx.rect(162, 162, 300, 4);
        ctx.fillStyle = "#E8E8E8";
        ctx.fillRect(162, 110, 300, 4);
       ctx.fillStyle = "#1DB954";
        ctx.fillRect(162, 110, calc(progress, total), 4);
       ctx.fillStyle = '#B3B3B3';
       ctx.font = "14px Cairo-regular";
       ctx.fillText(startin, 162, 130);
       ctx.fillStyle = '#B3B3B3';
       ctx.font = "14px Cairo-regular";
       ctx.fillText(endin, 430, 130);
       function calc(progress, total) {
        let prg = (progress / total) * 300;
        if (isNaN(prg) || prg < 0) return 0;
        if (prg > 300) return 300;
        return prg;
    };
       function short(text, length) {
if (typeof text !== "string") return "";
        if (text.length <= length) return text;
        return text.substr(0, length).trim() + "...";
       }
  function format(time) {
if (!time) return "00:00";
        const text = moment(time).format("hh:mm:ss");
return text.split(':').slice(1).join(':');
  }
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'spotify.png');
    lb.reply({files: [attachment], components: [row]});
}
    } catch(err) {
  console.log(err)
      lb.reply(`**This user dosen't playing music on spotify**`);
}
  },
};