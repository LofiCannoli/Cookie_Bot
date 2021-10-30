const itemModel = require('../../Models/itemSchema');
const profileModel = require('../../Models/profileSchema');
const {
	embedColour
} = require('../../config.json');
module.exports = {
	name: 'buy',
	aliases: ['purchase'],
	category: 'Shopping',
	usage: '!buy <itemId>',
	description: 'Purchases an item from the store',
	async execute(client, message, args, Discord, profileData) {
		if (!args[0]) return
		let itemID = args[0]

		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)

		//Find Item
		let itemData;
		try {
			itemData = await itemModel.findOne({
				itemID: itemID
			})

      if (!itemData) {
        message.channel.send({
          embeds: [embed.setDescription(`Couldnt Find item with the ID: **${itemID}**`)]
        })
      }
		} catch (err){}

    //Get price and check if user has the money

    const ItemPrice = itemData.itemPrice
    const UserMoney = profileData.cookies

    if(ItemPrice > UserMoney) {
       message.channel.send({
      embeds: [embed.setDescription(`You dont have enough :cookie:s your **${ItemPrice - UserMoney}**:cookie:s short`)]
    })
    return
  }

    //Removes money and updates stock
    await profileData.updateOne({
      $inc: {
        cookies: -ItemPrice
      }
    }, {
      upsert: true
    });

    if(itemData.amount <= 1){
      itemData.deleteOne({
        itemID: itemID
      })
    } else {
      itemData.updateOne({
        $inc: {
          amount: -1
        }
      }, {
        upsert: true
      });
    }

    //Adds product
    message.channel.send({
      embeds: [embed.setDescription(`Added one **${itemData.itemName}** to your account... somehow....`)]
    })
	}
}
