const itemModel = require('../../Models/itemSchema');
const {
	embedColour
} = require('../../config.json');
module.exports = {
	name: 'makeitem',
	aliases: ['sell'],
	category: 'Shopping',
	usage: '!usage <item name> <item price> [ammount to sell]',
	description: 'adds an item to the shop',
	async execute(client, message, args, Discord, profileData) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)
		//Parsing Input
		if (!args[0] || !args[1]) return
		let [itemName, itemPrice, ammountToSell] = args
		if (!ammountToSell) ammountToSell = 1
		if (isNaN(itemPrice) || isNaN(ammountToSell)) return message.channel.send('Nan error OWO')

		let itemID = Date.now()
		// Make Item
		let ItemData = await itemModel.create({
		  itemID: itemID,
      userID: message.author.id,
		  itemName: itemName,
		  itemPrice: itemPrice,
		  amount: ammountToSell,
		})
		embed.setDescription(`Created Item With ID: **${itemID}**`)
			.addFields({
				name: 'Item Name:',
				value: `*${itemName}*`,
				inline: true
			}, {
				name: 'Item Price:',
				value: `**${itemPrice}**:cookie:s`,
				inline: true
			}, {
				name: 'Stock:',
				value: `*${ammountToSell}*`,
				inline: true
			})
			.setTimestamp()
			.setFooter(message.author.username, message.author.avatarURL({
				dynamic: true
			}))

		message.channel.send({
			embeds: [embed]
		})
	}
}
