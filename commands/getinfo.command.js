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
 * discord.js
 * channels (Channel information.)
 */
const Discord = require('discord.js');
const channels = require('../config/channelinfo.json');

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