module.exports = {
  name: `lyrics`,
  description: `Show song lyrics`,
  usage: `h?lyrics <name or id>`,
category:`Information`,
  aliases: [`ly`],
  example: `h?lyrics goosebumps`,
  run: async(lb, lbargs, bot, Discord) => {
    function short(text, length) {
if (typeof text !== "string") return "";
        if (text.length <= length) return text;
        return text.substr(0, length).trim() + `[...](${firstSong.url})`;
    }
    let song = lb.content.split(' ').slice(1).join(' ');
  const Genius = require("genius-lyrics");
  try {
const clnt = new Genius.Client(process.env.gtoken);
 const searches = await clnt.songs.search(song);
const firstSong = searches[0];
const lyrics = await firstSong.lyrics();
 let embed = new Discord.MessageEmbed()
  .setAuthor(firstSong.title, firstSong.image)
  .setTitle(`**${firstSong.title}**`)
  .setColor(bot.config.color)
  .setThumbnail(firstSong.image)
  .setURL(firstSong.url)
  .setDescription(`${short(lyrics, 4076)}`);
  lb.reply({embeds: [embed]});
  } catch(err) {
    console.log(err)
    lb.reply(`**❌ | i can't find this song**`)
  }
  }
}