module.exports = {
  name: "ping",
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
   * @param {Discord.CommandInteraction} interaction
   * @param {Discord.String[]} args
   */

  async execute(client, interaction, args, Discord, config, embedcolor) {
    try {

        await interaction.reply({ embeds:[new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(`🔍 Checking Ping...`)]})
            
            interaction.editReply({embeds: [new Discord.MessageEmbed()
              .setColor(embedcolor)
              .setTitle(`🏓 Pong!`)
              .addFields({ 
                  name: 'Message Latency',
                  value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                  inline: true
              }, {
                  name: `Shard \`${interaction.guild.shard.id}\` Latency`,
                  value: `\`${interaction.guild.shard.ping}ms\``,
                  inline: true
              }, {
                  name: 'Websocket Ping',
                  value: `\`${client.ws.ping}ms\``,
                  inline: true
              })]}
            );
    } catch (err) {
      console.log(err)
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