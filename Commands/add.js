const profileModel = require('../Models/profileSchema');
import { check_Id } from '../Functions/check_id'

module.exports = {
  name: 'add',
  aliases: ['+'],
  description: "add coins to user",
  async execute(client, message, args, Discord){
    const ammountToAdd = args[0]
    const recivingId = args[1]

    //Check to make sure user exist
    if( !await check_Id(client, recivingId)) return message.channel.send('couldnt find user')

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
    message.channel.send(`added ${ammountToAdd} to ${recivingId}'s account'`)
  },
 };
