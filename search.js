const api = require('genius-api');
const genius = new api(process.env.gtoken);
const { 
MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
  module.exports = {
  name: 'search',
  description: 'Search about song by name',
  usage: `h?search <song name>`,
  example: `h?search Pick up the phone`,
  catg: `Infromation`,
  aliases: [],
  run: (lb, lbargs, bot, Discord) => {
   try {
     if(!lbargs) return lb.reply(`**Please enter name of song**`);
     genius.search(lbargs).then(function(res) {
    let all = new Array();
       res.hits.filter(so => so.type === "song").forEach(s => {
         all.push({label: s.result.title_with_featured, description: "By " + s.result.artist_names, value: String(s.result.id)})
       })
  let row = new MessageActionRow()
       .addComponents(
         new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select The Song')
					.addOptions(all)
       )
       let songs = "";
       let num = 0;
        res.hits.filter(so => so.type === "song").forEach(song => {
            num++
            songs += `**${num} [${song.result.title}](${song.result.url})**\n`
        })
       let embedAsk = new MessageEmbed()
       .setTitle(`**Top results of ${lbargs}!**`)
 .setColor(bot.config.color)
       .setDescription(songs);
          lb.reply({embeds: [embedAsk], components: [row]})
       let filter = i => i.user.id === lb.author.id && i.customId === "select";
       let col = lb.channel.createMessageComponentCollector({filter});
col.on('collect', async i => {
  genius.song(Number(i.values[0])).then(async function(so) {
  let embed = new MessageEmbed()
      .setAuthor(so.song.title, so.song.song_art_image_url)
      .addField(`**Title**`, `\`${so.song.title}\``)
      .addField(`**ID**`, `\`${so.song.description_annotation.song_id}\``)
      .addField(`**Release Date**`, `\`${so.song.release_date_for_display}\``)
      .addField(`**Views**`, `\`${so.song.stats?.pageviews || 'None'}\``)
      .addField(`**Trending**`, `\`${so.song.stats.hot === true ? 'Yes' : 'No'}\``)
      .addField(`**Primary Artist**`, `\`${so.song.primary_artist.name}\``)
      .setColor(bot.config.color)
      .setFooter(`Type h?artist ${so.song.primary_artist.name} for more information about the artist`, so.song.song_art_image_url)
      .setThumbnail(so.song.song_art_image_url);
    await i.update({embeds: [embed], components: []});
    col.stop();
             });
})
});
   } catch(err) {
     lb.reply(`**🔍 | I can't find results for this song.**`)
                                          }    
  },
};