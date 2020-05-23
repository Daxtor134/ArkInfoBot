/**   CURRENT LICENSE AGREEMENT (MIT) (WARRANTY IS NON-EXISTENT)
 * MIT License
 * Copyright (c) 2020 Daxtor134
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**   Includes
 * discord.js (Used for talking back and forth to the Discord Bot.)
 * colors (Used for CLI (Command Line Interface) Styling.)
 * dotenv (Used for Enviroment Variables.)
 * fs (File System used for navigating the file system.)
 */

const fs = require('fs');
const Discord = require('discord.js');
const Colors = require('colors');
require('dotenv').config();

const log = console.log;      // Reassigning the console.log function.
const error = console.error;  // Reassigning the console.error function.

const token = process.env.LOGIN_TOKEN; // Pulling the login token from the Enviroment Variables.
const prefix = process.env.PREFIX;     // Pulling the prefix from the Enviroment Variables

const client = new Discord.Client();   // Create the Discord Client (The bot).
client.commands = new Discord.Collection(); // Commands Collection.

/**
 * Loads any command files in the "./commands" folder.
 */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (file of commandFiles)
{
      const command = require(`./commands/${file}`);
      log(Colors.cyan(`LOADED COMMAND:\n${file}`));
      client.commands.set(command.name, command);
}

/**
 * First, we notify the fact that the bot has launched and is ready to accept commands,
 * then we set the bots activity along with it's prefix.
 */

client.once('ready', () => {
      log(Colors.green(`@<bot-${client.user.id}> LOGGED IN . . .\nREADY TO ACCEPT COMMANDS`));
      client.user.setActivity(`lilarkk | ${prefix}`, { type: `WATCHING` })
            .then(presence => log(Colors.yellow(`Activity set to:\n${presence.activities[0].type} ${presence.activities[0].name}`)))
            .catch(error);
});

/**
 * Parse incoming commands.
 */

client.on('message', message => {
      if(!message.content.startsWith(prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = client.commands.get(commandName)
            || client.commands.get(cmd => cmd.aliases && cmd.alises.includes(commandName));
      
      if (!command) return message.channel.send(`Sorry, that command does not exist, ${message.author}`);

      if (command.guildOnly && message.channel.type !== 'text') return message.channel.send(`Sorry but I can't execute this command inside of the DM's sorry.`);

      if (command.args && !args.length)
      {
            let reply = `You didn't supply any arguments, ${message.author}`;
            if (command.usage)
            {
                  reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            message.channel.send(reply);
      }

      try
      {
            command.execute(command, args);
            log(Colors.bold(Colors.rainbow(`@<user-${message.author.id}> has used the command\n${command}`)));
      }
      catch(e)
      {
            error(Colors.red(`RUN-TIME ERROR: ${e}`));
      }
});

// Login the bot 🙌
client.login(token);