const { color } = require(`../../config/bot.json`);
module.exports = {
  name: `ping`,
  description: `Get bot latency`,
  category: 'Util & Core',
  aliases: ['latency'],
usage: `h?ping`,
  example: `h?ping`,
  run: (lb, lbargs, bot, Discord) => {
    lb.reply('**Please wait until i finish recording this mixtape**').then(m => {
      m.delete();
     let ping = new Discord.MessageEmbed()
    .setTitle(`**HipHop Bot Latency**`)
    .setDescription(`🏓 **\`${lb.client.ws.ping}\`ms**\n**⏱️ \`${m.createdTimestamp - lb.createdTimestamp}\`ms**`)
    .setColor(color);
    lb.reply({embeds: [ping]});
      })
  }
}
