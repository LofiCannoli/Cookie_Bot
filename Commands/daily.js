import { formatTime } from '../Functions/format_time'

module.exports = {
  name: 'daily',
  aliases: ['claim'],
  description: "Claim your daily cookies",
  async execute(client, message, args, Discord, profileData){
    if (Date.now() - profileData.lastClaim >= 57600000){
      await profileData.updateOne({lastClaim: Date.now()}, {upsert: true});

      const min = Math.ceil(50)
      const max = Math.floor(200)

      let randomCookies = Math.floor(Math.random() * (max - min) + min);

      await profileData.updateOne({ $inc: { cookies: randomCookies } }, {upsert: true});

      return message.channel.send(`Added ${randomCookies} cookies`)
    } else {
      const timeLeft = (57600000 - (Date.now() - profileData.lastClaim));
      return message.channel.send(`You have ${formatTime(timeLeft)} left`);
    }
  }
}
