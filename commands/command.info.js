const CommandInfoDiscord = require('discord.js');
const CommandChalk = require('chalk');

const channels = require('../config/channels.json');

module.exports = {
      name: "info",
      description: "The info command for the ArkInfoBot, type this with the argument for the type of information you want and the bot will give you it!",
      guildOnly: true,
      args: true,
      usage: "--yt or --twitch",
      execute(message, args)
      {
            if (args[0] === `--yt`)
            {
                  message.reply("YouTube Information");
            }

            if (args[0] === `--twitch`)
            {
                  message.reply("Twitch Information");
            }
      }
};