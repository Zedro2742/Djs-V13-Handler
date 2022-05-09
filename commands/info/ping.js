const Discord = require("discord.js");
const config_support = require(`${process.cwd()}/structures/botconfig/support.json`);

module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: '',
  description: "Gives you information on how fast the Bot can respond to you",
  category: "info",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, config, embedcolor) {
    try {
      const msg = await message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(embedcolor)
          .setAuthor({
            name: `🔍 Checking Ping...`,
            iconURL: message.author.displayAvatarURL({
              dynamic: true
            }),
            url: config_support.server_link
          })
        ]
      })

      msg.edit({
        embeds: [new Discord.MessageEmbed()
          .setColor(embedcolor)
          .setAuthor({
            name: `Pong`,
            iconURL: message.author.displayAvatarURL({
              dynamic: true
            }),
            url: config_support.server_link
          })
          .addFields({
            name: 'Message Latency',
            value: `\`${msg.createdTimestamp - message.createdTimestamp}ms\``,
            inline: true
          }, {
            name: `Shard \`${message.guild.shard.id}\` Latency`,
            value: `\`${message.guild.shard.ping}ms\``,
            inline: true
          }, {
            name: 'Websocket Ping',
            value: `\`${client.ws.ping}ms\``,
            inline: true
          })
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/yHdne85PvM
 * @INFO
 * Work for Milanio Development | https://discord.gg/yHdne85PvM
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */