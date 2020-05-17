const discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config();

const prefix = process.env.PREFIX;

const client = new discord.Client();
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

for (const file of commandFiles)
{

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(chalk.yellow(`Loaded ${file}`));

}

client.once(`ready`, () => {

    console.log(chalk.green(`${client.user.tag} is now currently running; type in the command "!help" to get information on commands!`));

});

client.on(`message`, msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.get(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && msg.channel.type !== `text`)
    {
        return msg.reply(`I can't exeucte that command inside DM's.`);
    }

    if (command.args && !args.length)
    {
        let reply = `You didn't provide any arguments, ${msg.author}`;
        if(command.usage)
        {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return  msg.channel.send(reply);
    }

    try
    {
        command.execute(msg, args);
    }
    catch(e)
    {
        console.error(chalk.red(e));
        msg.reply(`There was an error trying to process that command!`);
    }

});

client.login(process.env.TOKEN);