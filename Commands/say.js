module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'says the message following the command',
  execute(client, message, args){
    message.channel.send('**' + args.join(' ') + '**')
  }
}
