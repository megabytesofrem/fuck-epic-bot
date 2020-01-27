const process = require('process');
const _ = require('lodash'); // for sample

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Reply to messages
client.on('message', msg => {

  // Regex to check if the message contains the words "Epic Games" or
  // any form of them (we could use .includes, but this is nicer)
  const epicGamesRegex = /Epic(\s|_)?(Games)?(\s|_)?(Store)?/gi;

  let content = msg.content

  if (epicGamesRegex.test(content) && !msg.author.bot) {
    // Now lets test for it containing positive words

    const positiveRegex = /(\b|_)?(\w*cool|best|better|great|amazing|awesome|love\w*)(\b|_)?/g;
    const negativeRegex = /(\b|_)?(\w*shit|fuck|worst|worse|bad|terrible|awful|hate\w*)(\b|_)?/g;
    if (positiveRegex.test(content)) {
      // Success! Inform the sender of the truth!
      let response = _.sample(config['responses']);
      msg.reply(response);
    }
  }
});

// Token is passed via process.env
client.login(process.env['BOT_TOKEN']);