const profileModel = require('../../Models/profileSchema');
const {
	embedColour
} = require('../../config.json');

module.exports = {
	name: 'give',
	aliases: ['donate', 'pay'],
	category: 'Eco',
	usage: '!give <ammount> <mention/id>',
	description: 'You share some of your cookies :)',
	async execute(client, message, args, Discord, profileData) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)

		//Parse Inputs
		if (!args[0] || !args[1]) return
		const ammountToGive = args[0]
		let userToGive = args[1]

		try {
			if (args[1].startsWith('<@')) {
				userToGive = await client.users.fetch(message.mentions.users.first().id)
			} else {
				userToGive = await client.users.fetch(userToGive)
			}

		} catch (error) {
			embed.setTitle(`Couldnt find user: ${args[1]}`)
			return message.channel.send({
				embeds: [embed]
			});
		}

		//Check if user has money
		if (profileData.cookies < ammountToGive) {
			embed.setTitle(`You dont have enough :cookie:s`)
			return message.channel.send({
				embeds: [embed]
			});
		}

		//Remove money from user
		try {
			profileData = await profileModel.findOneAndUpdate({
				userID: message.author.id
			}, {
				$inc: {
					cookies: -ammountToGive
				}
			});
		} catch (err) {
			console.log(err)
		}

		profileData = null;
		try {
			profileData = await profileModel.findOneAndUpdate({
				userID: userToGive.id
			}, {
				$inc: {
					cookies: ammountToGive
				}
			});
			//If no user found, makes new entry in db with correct money
			if (!profileData) {
				let profile = await profileModel.create({
					userID: userToGive.id,
					cookies: ammountToGive
				});
				await profile.save()
			}
		} catch (err) {
			console.log(err)
		}
	}
}
