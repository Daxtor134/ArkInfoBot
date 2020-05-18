/**
 * Author: Daxtor134
 * Date Created: 5/17/2020
 * Description: This is the launching point for the bot itself. This basically just handles the bot's commands and thats it.
 */

// Natives
const fs = require('fs');

// dotenv
require('dotenv').config();

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

// Other Stuff
const Discord = require('discord.js');
const chalk = require('chalk');

// Reassigning (console.log)
const log = console.log;

// Creating objects
const client = new Discord.Client();

/**
 * client.commands collection.
 * This collection holds every command created, the command handler will pull a command when that specific command is called.
 */
client.commands = new Discord.Collection();

/**
 * Command Loader
 * Loads the commands in the commands folder.
 */
const CommandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for (const file of CommandFiles)
{
      const Command = require(`./commands/${file}`);
      client.commands.set(Command.name, Command);
      log(chalk.cyan(`Loaded command file: ${chalk.bold(file)}`));
}

/**
 * ONCE ready EVENT
 * Basically once the event fires saying the bot is ready, it will run the code in the event function.
 */
client.once(`ready`, () => {
      // Tells the dev. That the bot is ready to go!
      log(chalk.green(`${client.user.tag} is now running, the commands have loaded . . . everything is good to go chief!!!`));
      
      // Set the bots activity!
      client.user.setActivity('lilarkk', { type: `WATCHING` })
      .then(presence => log(chalk.yellow(`Activity set to ${presence.activities[0].type} ${presence.activities[0].name}`)))
      .catch(console.error);
});

/**
 * ON message EVENT
 * When a message is sent using the specified prefix the code inside this event function will fire.
 */
client.on(`message`, message => {
      // Checks if the message starts with the prefix and/or the message was sent by the bot . . . if so the code breaks.
      if(!message.content.startsWith(prefix) || message.author.bot) return;

      // Command Arguments and the actual command itself.
      const args = message.content.slice(prefix.length).split(/ +/);
      const CommandName = args.shift().toLowerCase();

      // The command pulled from the commands collection.
      const command = client.commands.get(CommandName);

      // If the command does not exist the code breaks.
      if (!command) return;

      // Checks if the command is set to guild only in the command settings.
      if (command.guildOnly && message.channel.type !== `text`) return message.reply(`I can't execute that command inside of the **DM's**! Sorry.`);

      // Checks to see if the command has arguments in the command settings and checks if the command request has any arguments too!
      if (command.args && !args.length)
      {
            let reply = `You didn't provide any arguments, ${message.author}`;
            if (command.usage)
            {
                  reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
      }

      // Attempts to execute the command.
      try
      {
            command.execute(message, args);
      }
      catch (e)
      {
            console.error(chalk.red(e));
            message.reply(`There was an error trying to execute that command! Try again later.`);
      }
});

// Logs the bot in! 🙌
client.login(token);