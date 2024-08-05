const api = require('genius-api');
const genius = new api(process.env.gtoken);
module.exports = { 
  name: 'song',
  description: 'showing you song information',
  usage: `h?song <song id or name>`,
  example: `h?song Pick up the phone`,
  catg: `Infromation`,
  aliases: [],
  run: (lb, lbargs, bot, Discord) => {
    try { 
    let key = lb.content.split(' ').slice(1).join(' ');
    if(!lb.guild || lb.author.bot || !key) return;
      if(!isNaN(key)) {
        genius.song(key).then(function(s) {
      let embed = new Discord.MessageEmbed()
      .setAuthor(s.song.title, s.song.song_art_image_url)
      .addField(`**Title**`, `\`${s.song.title}\``)
      .addField(`**ID**`, `\`${s.song.description_annotation.song_id}\``)
      .addField(`**Release Date**`, `\`${s.song.release_date_for_display}\``)
      .addField(`**Views**`, `\`${s.song.stats?.pageviews || "None"}\``)
      .addField(`**Trending**`, `\`${s.song.stats.hot === true ? 'Yes' : 'No'}\``)
      .addField(`**Primary Artist**`, `\`${s.song.primary_artist.name}\``)
      .setColor(s.song.song_art_primary_color)
      .setFooter(`Type h?artist ${s.song.primary_artist.name} for more information about the artist`, s.song.song_art_image_url)
      .setThumbnail(s.song.song_art_image_url);
      lb.reply({embeds: [embed]});
    });
      }
    if(isNaN(key)) {
      genius.search(key).then(function(ss) {
        genius.song(ss.hits[0].result.id).then(function(s) {
      let embed = new Discord.MessageEmbed()
      .setAuthor(s.song.title, s.song.song_art_image_url)
      .addField(`**Title**`, `\`${s.song.title}\``)
      .addField(`**ID**`, `\`${s.song.description_annotation.song_id}\``)
      .addField(`**Release date**`, `\`${s.song.release_date_for_display}\``)
      .addField(`**Views**`, `\`${s.song.stats?.pageviews || "None"}\``)
      .addField(`**Trending**`, `\`${s.song.stats.hot === true ? 'Yes' : 'No'}\``)
      .addField(`**Primary Artist**`, `\`${s.song.primary_artist.name}\``)
      .setColor(bot.config.color)
      .setFooter(`Type h?artist ${s.song.primary_artist.name} for more information about the artist`, s.song.song_art_image_url)
      .setThumbnail(s.song.song_art_image_url);
      lb.reply({embeds: [embed]});
    });
      });
    }
  } catch(err) {
    lb.reply(`**🔍 | No songs found**`);
  }
  },
};
