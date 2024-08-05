const fs = require('fs');
const { color, prefix, gtoken, brand } = require(`../../config/bot.json`);
const { glob } = require('glob');
const { promisify } = require('util');
const PG = promisify(glob);
const { MessageEmbed, MessageActionRow, MessageCollector, MessageSelectMenu, MessageButton } = require(`discord.js`);
module.exports = {
  name: `help`,
  description: `Get information about command or get all commands`,
  category: `Util & Core`,
  usage: `${prefix}help | ${prefix}help [command name]`,
  aliases: [`command`],
  example: `h?help | h?help ping`,
run: async(lb, lbargs, bot) => {
  ut = [];
  inform = [];
  (await PG(`${process.cwd()}/commands/Utility/*.js`)).map(async(cmds) => {
let cmd = require(cmds);
      ut.push(`> \`${prefix}${cmd.name}\` - ${cmd.description}`)
  });
  (await PG(`${process.cwd()}/commands/Info/*.js`)).map(async(cmds) => {
let cmd = require(cmds);
      inform.push(`> \`${prefix}${cmd.name}\` - ${cmd.description}`)
  });
  if(lbargs) {
    var command = bot.commands.get(lbargs) || bot.commands.find(c => c.aliases.includes(lbargs) || 'balalksskksj')
    if(command === 'balalksskksj') return lb.reply(`I can't find this command 🙄`);
    if(!command.aliases) command.aliases = 'No Aliases Found';
    if(command.aliases) command.aliases = command.aliases.join(", ");
    let help = new MessageEmbed()
    .setAuthor(`${command.name.split('').slice(0,1).join(' ').toUpperCase()}${command.name.split('').slice(1).join('').toLowerCase()} Command`, brand)
      .setDescription(`**❔ Command information :**\n\`\`\`\nName : ${command.name}\nDescription : ${command.description}\nAliases : ${command.aliases}\nCategory : ${command.category || 'None'}\nUsage : ${command.usage}\n\`\`\`\n**🎳 Example :**\n\`\`\`\n${command.example}\n\`\`\``)
      .setColor(color)
.setThumbnail(brand);
    lb.reply({embeds: [help]});
  } else {
    let menu = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
    .setCustomId('select')
					.setPlaceholder('Select A Category')
					.addOptions([
						{
							label: 'Utility & Core',
							description: 'All utility and general commands',
							value: 'util',
              emoji: `🤖`,
						},
            {
         label: `Information`,
              description: `All information commands to get information about songs and artists`,
              value: `info`,
              emoji: `ℹ️`,
              },
            ])
  );
  let buttons = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setStyle("LINK")
    .setLabel(`Community`)
    .setURL('https://discord.gg/hiphopar')
    .setEmoji(`💬`),
    new MessageButton()
    .setEmoji(`🤖`)
    .setStyle(`LINK`)
    .setLabel(`Bot Invite`)
.setURL(`https://discord.com/api/oauth2/authorize?client_id=855547500135972874&permissions=8&scope=bot`)
  );
      let embed = new MessageEmbed()
        .setColor(color)
  .setThumbnail(lb.author.avatarURL({dynamic: true}))
   .setAuthor(`Welcome To The HipHop Bot Help Menu`, brand)
  .setDescription(`**HipHop Bot help you to search about songs, search about you favourite song by there lyrics, search about song lyrics, search about artist's and group's & more in one bot**`);
  lb.reply({embeds: [embed], components: [menu, buttons]});
  const filter = i => i.customId === 'select' && i.user.id === lb.author.id;
const collector = lb.channel.createMessageComponentCollector({filter});
collector.on('collect', async i => {
	if (i.customId === 'select' && i.values[0] === `util` && i.user.id === lb.author.id) {
    let util = new MessageEmbed()
    .setColor(color)
  .setThumbnail(lb.author.avatarURL({dynamic: true}))
   .setAuthor(`Welcome To The HipHop Bot Help Menu`, brand)
    .setDescription(`** 🤖 Utility & Core Commands**\n${ut.join('\n')}`);
     await i.update({embeds: [util]}).catch(err => console.log(err));
  }
  if(i.customId === 'select' && i.values[0] === `info` && i.user.id === lb.author.id) {
    let info = new MessageEmbed()
    .setColor(color)
  .setThumbnail(lb.author.avatarURL({dynamic: true}))
   .setAuthor(`Welcome To The HipHop Bot Help Menu`, brand)
    .setDescription(`** ℹ️ Information Commands**\n${inform.join('\n')}`);
    await i.update({embeds: [info]}).catch(err => console.log(err));
  }
})
    }
   }
  }