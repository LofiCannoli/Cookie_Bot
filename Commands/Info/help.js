const {
	embedColour
} = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js')
const {
	stripIndents
} = require("common-tags");

module.exports = {
	name: 'help',
	aliases: ['h'],
	category: "Info",
	usage: '!help [command]',
	description: "Gives a list of commands or description of specific command",
	execute(client, message, args, Discord, profileData) {
		if (args[0]) {
			return getCMD(client, message, args[0]);
		} else {
			return getAll(client, message);
		}
	}
}

function getAll(client, message) {
	const embed = new Discord.MessageEmbed()
		.setColor(embedColour)

	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `*•${cmd.name[0].toUpperCase() + cmd.name.slice(1)}*`)
			.join("\n");
	}

	const info = client.categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + "\n" + category);

	return message.channel.send({
		embeds: [embed.setDescription(info)]
	})
}

function getCMD(client, message, input) {
	const embed = new Discord.MessageEmbed()

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.find(a => a.aliases.includes(input.toLowerCase()));

	let info = `No information found for command **${input.toLowerCase()}**`;

	if (!cmd) {
		return message.channel.send(embed.setColor(embedColour).setDescription(info));
	}
	if (cmd.name) embed.setTitle(`**Command name**: ${cmd.name[0].toUpperCase() + cmd.name.slice(1)}`);
	if (cmd.aliases) info = `\n**Aliases**: ${cmd.aliases.map(a => `**${a}**`).join(", ")}`;
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter(`Syntax: <> = required, [] = optional`);
	}

	return message.channel.send({
		embeds: [embed.setDescription(info).setColor(embedColour)]
	})
}
