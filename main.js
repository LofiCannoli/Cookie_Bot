const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const { token, mongoDB } = require('./config.json');
const mongoose = require('mongoose');

const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlers = fs.readdirSync('./Handlers/').filter(file => file.endsWith('.js'))
handlers.forEach(handler =>{
  require(`./Handlers/${handler}`)(client, Discord)
})

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to Mongoose DB');
}).catch((err) => {
  console.log(err)
})

client.login(token);
