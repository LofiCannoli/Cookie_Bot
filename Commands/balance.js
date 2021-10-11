import { check_Id } from '../Functions/check_id'
const profileModel = require('../Models/profileSchema');
const { embedColour } = require('../config.json');

module.exports = {
  name: 'balance',
  aliases: ['bal', '$'],
  description: "Checks users cookies",
  async execute(client, message, args, Discord, profileData){

    const embed = new Discord.MessageEmbed()
    .setColor(embedColour)

    //If no user mentioned use author
    if(!args[0]) args[0] = message.author.id

    // Handels mentions
    if(args[0].startsWith('<@')){
      args[0] = message.mentions.users.first().id
    }

    //Try and get user, return error message if faied
    let user;
    try{
      user = await client.users.fetch(args[0])
    } catch {
      embed.setTitle(`Couldnt find user: ${args[0]}`)
      return message.channel.send({ embeds: [embed] });
    }

    // Try and get DB entry with proper id
    try{
      let userData = await profileModel.findOne({userID: args[0]})
      // If failed create one
      if(!userData){
        let profile = await profileModel.create({
          userID: args[0],
          cookies: 0
        });
        userData = profile
      }
      embed.setDescription(`**${user.tag}** has **${userData.cookies}** :cookie:s`)
      message.channel.send({ embeds: [embed] })
    } catch(err){
      console.log(err)
    }
  }
}
