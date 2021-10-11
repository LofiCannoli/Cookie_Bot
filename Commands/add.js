const profileModel = require('../Models/profileSchema');
const {embedColour} = require('../config.json');

module.exports = {
	name: 'add',
	aliases: ['+'],
	description: "add coins to user",
	async execute(client, message, args, Discord) {

		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)

		if (!args[0]) return
		if (!args[1]) args[1] = message.author.id

		const ammountToAdd = args[0]
		let recivingId = args[1]

		//Check to make sure user exist
		let user
		try {
			if (args[1].startsWith('<@')) recivingId = message.mentions.users.first().id
			user = await client.users.fetch(recivingId)
		} catch (err) {
			console.log(err)
			embed.setTitle(`Couldnt find user: ${recivingId}`)
			return message.channel.send({
				embeds: [embed]
			});
		}

		//Finds and updates user with new ammount of money
		let profileData;

		try {
			profileData = await profileModel.findOneAndUpdate({
				userID: recivingId
			}, {
				$inc: {
					cookies: ammountToAdd
				}
			});
			//If no user found, makes new entry in db with correct money
			if (!profileData) {
				let profile = await profileModel.create({
					userID: recivingId,
					cookies: ammountToAdd
				});
				await profile.save()
			}
		} catch (err) {
			console.log(err)
		}
		embed.setDescription(`Added **${ammountToAdd}** :cookie:s to **${user.tag}'s** account'`)
		message.channel.send({
			embeds: [embed]
		})
	},
};
//test
