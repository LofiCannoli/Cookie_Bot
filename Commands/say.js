const { embedColour } = require('../config.json');

module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'says the message following the command',
  execute(client, message, args, Discord){
    const embed = new Discord.MessageEmbed()
    .setColor(embedColour)
    .setDescription(args.join(' '))
    .setFooter(message.author.username, message.author.avatarURL({ dynamic:true }))
    .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }
}
