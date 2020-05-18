require('dotenv').config();
const Discord = require('discord.js');

const AccountInformation = {
      YouTube: { name: "Ark", description: "My name is Ark, sup?", url: "https://www.youtube.com/channel/UC8iFm2BtD5q3HnZOvWHg0CA", trailer: "https://www.youtube.com/watch?v=52ml6SRNtG0", thumb: "https://i.imgur.com/lQHyj4A.jpg" },
      Twitch: { name: "lilarkk", description: "I'm a up coming streamer who plays games I enjoy. I'm trying to make something from nothing and base my life around something I enjoy but also you can enjoy too. I appreciate the love and help from the community and friends thank you.", url: "https://www.twitch.tv/lilarkk", thumb: "https://i.imgur.com/lQHyj4A.jpg" }
}

module.exports = {
      "name": "info",
      "description": "This command will give info about the person specified in the env. settings.",
      "args": true,
      "usage": "<platform [--yt, --twitch]>",
      "guildOnly": true,
      execute(msg, args)
      {
            if(args[0] === '--yt')
            {
                  /**
                   * Basically just a YouTube Message Embed. All we are giving to the user is the description of the YouTube channel,
                   * the URL (link) to the channel, and maybe a preview video.
                   * 
                   * Nothing is pulled from any website . . . i.e. No web scraping!
                   */
                  const YTMessageEmbed = new Discord.MessageEmbed()
                        .setColor(`#EB4034`)
                        .setTitle(`**YouTube:** ${AccountInformation.YouTube.name}`)
                        .setDescription(AccountInformation.YouTube.description)
                        .setAuthor(`ArkInfoBot`, `https://i.imgur.com/lQHyj4A.jpg`)
                        .setThumbnail(AccountInformation.YouTube.thumb)
                        .addField(`Channel Link`, `${AccountInformation.YouTube.url}`)
                        .addField(`Watch a video!`, `https://www.youtube.com/watch?v=52ml6SRNtG0`)
                        .setTimestamp()
                        .setFooter(`ArkInfoBot`, `https://i.imgur.com/lQHyj4A.jpg`);

                        msg.channel.send(YTMessageEmbed);
            }

            if(args[0] === '--twitch')
            {
                  /**
                   * Basically this is just information about someones twitch account
                   */
                  const TwitchMessageEmbed = new Discord.MessageEmbed()
                        .setColor(`#EB4034`)
                        .setTitle(`**Twitch:** ${AccountInformation.Twitch.name}`)
                        .setDescription(AccountInformation.Twitch.description)
                        .setAuthor(`ArkInfoBot`, `https://i.imgur.com/lQHyj4A.jpg`)
                        .setThumbnail(AccountInformation.Twitch.thumb)
                        .addField(`Channel Link`, `${AccountInformation.Twitch.url}`)
                        .addField(`Watch a video!`, `https://www.youtube.com/watch?v=52ml6SRNtG0`)
                        .setTimestamp()
                        .setFooter(`ArkInfoBot`, `https://i.imgur.com/lQHyj4A.jpg`);

                        msg.channel.send(TwitchMessageEmbed);
            }
      }
}