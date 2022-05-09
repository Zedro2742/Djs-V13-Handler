// Commands Template
const Discord = require("discord.js");

module.exports = {
  name: '',
  aliases: [],
  usage: '',
  description: '',
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
      // Start Coding
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}

// ---------------------------------------------------

// Slash Command Template
const Discord = require("discord.js");

module.exports = {
  name: '',
  usage: '',
  description: '',
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Discord.Client} client 
   * @param {Discord.CommandInteraction} interaction
   * @param {String[]} args
   */

  async execute(client, interaction, args, config, embedcolor) {
    try {
      // Start Coding
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/yHdne85PvM
 * @INFO
 * Work for Milanio Development | https://discord.gg/yHdne85PvM
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */
