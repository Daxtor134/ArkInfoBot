// Import dependencies
const discord = require('discord.js');
const chalk = require('chalk');

// Enviroment Variables
require('dotenv').config();

// Create the Discord bot object.
const client = new discord.Client();

client.once('ready', () => {
    console.log(chalk.green(`Discord bot ${client.user.tag} is currently running.`));
});

client.on('message', message => {
    if(message.content === 'ping')
    {
        message.reply('pong');
    }
});

client.login(process.env.TOKEN);