const fs = require('fs');

module.exports = (client, Discord) => {
  const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'))
  for( const file of commandFiles ){
    const command = require(`../Commands/${file}`);
    client.commands.set(command.name, command);

  };
}
