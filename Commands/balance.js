import { check_Id } from '../Functions/check_id'
const profileModel = require('../Models/profileSchema');

module.exports = {
  name: 'balance',
  aliases: ['bal', '$'],
  description: "Checks users cookies",
  async execute(client, message, args, Discord, profileData){
    let balance;

    if(args.length != 0){
      if( !await check_Id(client, args[0])) return message.channel.send('couldnt find user')


      try {
        let userData = await profileModel.findOne({userID: args[0]})

        if(!userData){
          let profile = await profileModel.create({
            userID: args[0],
            cookies: 0
          });
          await profile.save()
          balance = 0
        } else {
          balance = userData.cookies
        }
      } catch (err){
        console.log(err)
      }

    } else {
      let userData = await profileModel.findOne({userID: message.author.id})
      balance = userData.cookies
    }
    message.channel.send(`You have **${balance}** cookies`)
  }
}
