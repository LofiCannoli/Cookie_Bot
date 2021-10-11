const profileModel = require('../Models/profileSchema');
import { check_Id } from '../Functions/check_id'
const { embedColour } = require('../config.json');

module.exports = {
  name: 'remove',
  aliases: ['-', 'take'],
  description: "removes coins from user",
  async execute(client, message, args, Discord){

    const embed = new Discord.MessageEmbed()
    .setColor(embedColour)

    const ammountToRemove = args[0]
    const recivingId = args[1]

    if(args[1].startsWith('<@')){
      args[1] = message.mentions.users.first().id
    }

    //Check to make sure user exist
    let user
    try{
      user = await client.users.fetch(recivingId)
    } catch {
      embed.setTitle(`Couldnt find user: **${recivingId}**`)
      return message.channel.send({ embeds: [embed] });
    }

    //Finds and updates user with new ammount of money
    let profileData;

    try{
      profileData = await profileModel.findOneAndUpdate({userID: recivingId},{
        $inc: {
          cookies: -ammountToRemove
        }
      });
      //If no user found, makes new entry in db with correct money
      if(!profileData){
        embed.setDescription(`**${user.tag}** has no :cookie:s to take`)
        message.channel.send({ embeds: [embed] })
      }
    } catch(err){
      console.log(err)
    }
    embed.setDescription(`Removed **${ammountToRemove}** :cookie:s from **${user.tag}'s** account'`)
    message.channel.send({ embeds: [embed] })
  },
 };
