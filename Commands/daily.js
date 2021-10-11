import { formatTime } from '../Functions/format_time'
const { embedColour } = require('../config.json');

module.exports = {
  name: 'daily',
  aliases: ['claim'],
  description: "Claim your daily cookies",
  async execute(client, message, args, Discord, profileData){
    const embed = new Discord.MessageEmbed()
    .setColor(embedColour)

    if (Date.now() - profileData.lastClaim >= 57600000){
      await profileData.updateOne({lastClaim: Date.now()}, {upsert: true});

      const min = Math.ceil(50)
      const max = Math.floor(200)

      let randomCookies = Math.floor(Math.random() * (max - min) + min);

      await profileData.updateOne({ $inc: { cookies: randomCookies } }, {upsert: true});

      embed.setDescription(`Added **${randomCookies}** :cookie:s as your daily reward`)
      return message.channel.send({ embeds: [embed] })

    } else {
      const timeLeft = (57600000 - (Date.now() - profileData.lastClaim));
      embed.setDescription(`You have ${formatTime(timeLeft)} left until next daily reward`);
      return message.channel.send({ embeds: [embed] })
    }
  }
}
