const profileModel = require('../../Models/profileSchema')
const prefix = '!'

module.exports = async (Discord, client, message) => {



	let profileData;

	try {
		profileData = await profileModel.findOne({
			userID: message.author.id
		})
		if (!profileData) {
			let profile = await profileModel.create({
				userID: message.author.id,
				cookies: 0
			});
			await profile.save()
			profileData = await profileModel.findOne({
				userID: message.author.id
			})
		}

	} catch (err) {
		console.log(err)
	}

	const min = Math.ceil(1)
	const max = Math.floor(10)

	let randomCookies = Math.floor(Math.random() * (max - min) + min);

	if(Date.now() - profileData.lastReward >= 300000){
		await profileData.updateOne({
			lastReward: Date.now()
		}, {
			upsert: true
		});

		await profileData.updateOne({
			$inc: {
				cookies: randomCookies
			}
		}, {
			upsert: true
		});
	}


	if (!message.content.startsWith(prefix) || message.author.bot) return;


	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	const Command = client.commands.get(command) || client.commands.find(a => a.aliases.includes(command));

	if (Command) Command.execute(client, message, args, Discord, profileData);

}
