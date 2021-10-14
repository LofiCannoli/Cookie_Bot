const profileModel = require('../../Models/profileSchema');
const {
	embedColour
} = require('../../config.json');

module.exports = {
	name: 'remove',
	aliases: ['-', 'take'],
	category: "Eco",
	usage: '!remove <ammount> [person(id / mention)]',
	description: "removes coins from user",
	async execute(client, message, args, Discord) {

		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)

		if (!args[0]) return
		if (!args[1]) args[1] = message.author.id

		const ammountToRemove = args[0]
		let recivingId = args[1]

		//Check to make sure user exist
		let user
		try {
			if (args[1].startsWith('<@')) recivingId = message.mentions.users.first().id
			user = await client.users.fetch(recivingId)
		} catch {
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
					cookies: -ammountToRemove
				}
			});
			//If no user found, makes new entry in db with correct money
			if (!profileData) {
				let profile = await profileModel.create({
					userID: recivingId,
					cookies: -ammountToRemove
				});
				await profile.save()
			}
		} catch (err) {
			console.log(err)
		}
		embed.setDescription(`Removed **${ammountToRemove}** :cookie:s from **${user.tag}'s** account'`)
		message.channel.send({
			embeds: [embed]
		})
	},
};
