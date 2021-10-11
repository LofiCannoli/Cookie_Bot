const profileModel = require('../Models/profileSchema');
import { check_Id } from '../Functions/check_id'
const { embedColour } = require('../config.json');

module.exports = {
  name: 'add',
  aliases: ['+'],
  description: "add coins to user",
  async execute(client, message, args, Discord){

    if (!args[0]) return

    const embed = new Discord.MessageEmbed()
    .setColor(embedColour)

    if(!args[1]) args[1] = message.author.id

    // Handels mentions
    if(args[1].startsWith('<@')){
      args[1] = message.mentions.users.first().id
    }

    const ammountToAdd = args[0]
    const recivingId = args[1]

    //Check to make sure user exist
    let user
    try{
      user = await client.users.fetch(recivingId)
    } catch {
      embed.setTitle(`Couldnt find user: ${recivingId}`)
      return message.channel.send({ embeds: [embed] });
    }

    //Finds and updates user with new ammount of money
    let profileData;

    try{
      profileData = await profileModel.findOneAndUpdate({userID: recivingId},{
        $inc: {
          cookies:ammountToAdd
        }
      });
      //If no user found, makes new entry in db with correct money
      if(!profileData){
        let profile = await profileModel.create({
          userID: recivingId,
          cookies: ammountToAdd
        });
        await profile.save()
      }
    } catch(err){
      console.log(err)
    }
    embed.setDescription(`Added **${ammountToAdd}** :cookie:s to **${user.tag}'s** account'`)
    message.channel.send({ embeds: [embed] })
  },
 };
//test
