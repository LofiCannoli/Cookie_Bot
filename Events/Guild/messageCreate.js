const profileModel = require('../../Models/profileSchema')
const prefix = '!'

module.exports = async (Discord, client, message) => {

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;

  try{
    profileData = await profileModel.findOne({userID: message.author.id})
    if(!profileData){
      let profile = await profileModel.create({
        userID: message.author.id,
        cookies: 0
      });
      await profile.save()
      profileData = await profileModel.findOne({userID: message.author.id})
    }

  }catch(err){
    console.log(err)
  }



  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  const Command = client.commands.get(command) || client.commands.find(a => a.aliases.includes(command));

  if(Command) Command.execute(client, message, args, Discord, profileData);

}
