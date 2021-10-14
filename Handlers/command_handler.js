const fs = require('fs');

module.exports = (client, Discord) => {
	const categoryFolders = fs.readdirSync('./Commands/')
	for (const Category of categoryFolders) {
		const commandFiles = fs.readdirSync(`./Commands/${Category}/`).filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const command = require(`../Commands/${Category}/${file}`);
			client.commands.set(command.name, command);
		}
	}
}
