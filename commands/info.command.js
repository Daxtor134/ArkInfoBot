const Discord = require('discord.js');
const Chalk = require('chalk');

const log = console.log;

module.exports = {
      name: "info",
      description: "Shows information linking to Twitch Streamers & YouTuber's.",
      args: true,
      usage: "<type: [--yt, --twitch]>",
      guildOnly: true,
      aliases: ["inf"],
      execute(message, args)
      {
            if (args[0] === "--yt")
            {
                  message.reply("Used YouTube info command.");
            }
            if (args[0] === "--twitch")
            {
                  message.reply("Used the Twitch info command.");
            }
      }
};