const profileModel = require('../Models/profileSchema');
import { check_Id } from '../Functions/check_id'

module.exports = {
  name: 'remove',
  aliases: ['-', 'take'],
  description: "removes coins from user",
  async execute(client, message, args, Discord){
    const ammountToRemove = args[0]
    const recivingId = args[1]

    //Check to make sure user exist
    if( !await check_Id(client, recivingId)) return message.channel.send('couldnt find user')

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
        message.channel.send('This person has no cookies to take')
      }
    } catch(err){
      console.log(err)
    }
    message.channel.send(`removed ${ammountToRemove} from ${recivingId}'s account`)
  },
 };
