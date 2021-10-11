module.exports = {
	name: 'test',
	aliases: [],
	description: 'says the message following the command',
	async execute(client, message, args, Discord, profileData) {
		var resMsg = await message.channel.send('Ping is being appreciated... :bar_chart:');
		resMsg.edit('Your ping: ' + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - client.ws.ping));
		message.channel.send(`Bot ping: ${ Math.round(client.ws.ping)}`)
		message.channel.send(`You have **${profileData.cookies}** cookies`)
	}
}
