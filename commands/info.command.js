const Discord = require('discord.js');
const Chalk = require('chalk');
const channels = require('../config/channels.json');

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
                  // Send console message stating that a user used a command.
                  log(Chalk.yellow(`@<${message.author.id}> Used a Command.`));

                  // Create the Message Embed
                  // @YouTubeMessageEmbed
                  const YouTubeMessageEmbed = new Discord.MessageEmbed()
                        .setColor(`#fc1c03`)
                        .setTitle(`**${channels.YouTube.ChannelName}**`)
                        .setDescription(`${channels.YouTube.ChannelDescription}`)
                        .setThumbnail(`${channels.YouTube.ChannelIcon}`)
                        .setAuthor(`ArkInfoBot`, `${channels.YouTube.ChannelIcon}`)
                        .addField(`Channel Link`, `${channels.YouTube.ChannelLink}`)
                        .addField(`Check out a video`, `${channels.YouTube.ChannelPreviewVideo}`)
                        .setTimestamp()
                        .setFooter(`ArkInfoBot`, `${channels.YouTube.ChannelIcon}`);

                  // Send the Message Embed
                  message.author.send(YouTubeMessageEmbed);
            }
            if (args[0] === "--twitch")
            {
                  // Send console message stating that a user used a command.
                  log(Chalk.yellow(`@<${message.author.id}> Used a Command.`));

                  // Create the Message Embed
                  // @TwitchMessageEmbed
                  const TwitchMessageEmbed = new Discord.MessageEmbed()
                        .setColor(`#8403fc`)
                        .setTitle(`**${channels.Twitch.ChannelName}**`)
                        .setDescription(`${channels.Twitch.ChannelDescription}`)
                        .setThumbnail(`${channels.Twitch.ChannelIcon}`)
                        .setAuthor(`ArkInfoBot`, `${channels.Twitch.ChannelIcon}`)
                        .addField(`Channel Link`, `${channels.Twitch.ChannelLink}`)
                        .addField(`Check out a video`, `${channels.Twitch.ChannelPreviewVideo}`)
                        .setTimestamp()
                        .setFooter(`ArkInfoBot`, `${channels.Twitch.ChannelIcon}`);

                  // Send the Message Embed
                  message.author.send(TwitchMessageEmbed);
            }
      }
};