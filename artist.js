const api = require('genius-api');
const genius = new api(process.env.gtoken);

module.exports = {
  name: `artist`,
  description: `Show information about artist`,
  usage: `h?artist <name or id>`,
category:`Information`,
  aliases: [`singer`],
  example: `h?artist Tupac`,
  run: (lb, lbargs, bot, Discord) => {
try {
     const artist = lb.content.split(' ').slice(1).join(' ');
    if(!lb.guild || lb.author.bot) return;
  if(!artist) return lb.reply(`**Please enter artist name**`);
    if(!isNaN(artist)) {
      genius.artist(artist).then(function(at) {
        
        let embed = new Discord.MessageEmbed()
        .setAuthor(at.artist.name, at.artist.image_url, at.artist.url)
        .setColor(bot.config.color)
        .addField(`**Name**`, `\`${at.artist.name}\``)
        .addField(`**ID**`, `\`${at.artist.id}\``)
        .addField(`**Page URL**`, `**[Jump To](${at.artist.url})**`)
        .addField(`**Translation Artist**`, `\`${at.artist.translation_artist}\``)
        .addField(`**Verified Artist**`, `\`${at.artist.is_verified}\``)
        .addField(`**Followers**`, `\`${at.artist.followers_count}\``)
        .setThumbnail(at.artist.image_url);
         lb.reply({embeds: [embed]});
      });
    }
    if(isNaN(artist)) {
      genius.search(artist).then(function(a) {
      genius.artist(a.hits[0]. result.primary_artist.id).then(function(at) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`**${at.artist.description_annotation.range.content}**`)
        .setAuthor(at.artist.name, at.artist.image_url, at.artist.url)
        .setColor('4A4D4F')
        .addField(`**Name**`, `\`${at.artist.name}\``)
        .addField(`**ID**`, `\`${at.artist.id}\``)
        .addField(`**Page URL**`, `**[Jump To](${at.artist.url})**`)
        .addField(`**Translation Artist**`, `\`${at.artist.translation_artist}\``)
        .addField(`**Verified Artist**`, `\`${at.artist.is_verified}\``)
        .addField(`**Followers**`, `\`${at.artist.followers_count}\``)
        .setThumbnail(at.artist.image_url);
         lb.reply({embeds: [embed]});
      });
      });
    }
    } catch(err) {
      lb.reply(`🔍 **| No artists found**`);
    }
  }
}