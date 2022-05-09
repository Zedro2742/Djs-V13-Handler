const Discord = require("discord.js");
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const config_support = require(`${process.cwd()}/structures/botconfig/support.json`);
const functions = require(`${process.cwd()}/structures/handlers/functions`);

module.exports = {
	name: "interactionCreate",

	/**
	 * @param {Discord.Client} client 
	 * @param {Discord.CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		try {
			if (!interaction.guild || !interaction.channel) return;

			if (config.role_color) embedcolor = client.guilds.cache.get(interaction.guild.id).me.displayHexColor
			else embedcolor = config.color;

			let prefix = process.env.PREFIX;

			if (interaction.user.bot) return;

			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
				return interaction.reply({
					content: `>>> ❌ I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``,
					ephemeral: true
				})
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
				return interaction.reply({
					content: `>>> ${client.allEmojis.x} I am missing the Permission to \`EMBED_LINKS\``,
					ephemeral: true
				})
			if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
				return interaction.reply({
					embeds: [new Discord.MessageEmbed()
						.setColor(config.wrongcolor)
						.setAuthor({
							name: `Missing Permission`,
							iconURL: interaction.guild.iconURL({
								dynamic: true
							}),
							url: config_support.server_link
						})
						.setTitle(`>>> ${client.allEmojis.x} I am missing the Permission to \`ADD_REACTIONS\``)
					],
					ephemeral: true
				})

			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command) return client.slashCommands.delete(interaction.commandName);

				if (command) {
					try {

						const args = [];

						for (let option of interaction.options.data) {
							if (option.type === "SUB_COMMAND") {
								if (option.name) args.push(option.name);
								option.options?.forEach((x) => {
									if (x.value) args.push(x.value);
								})
							} else if (option.value) args.push(option.value);
						}

						if (config.maintenance_mode) {
							if (!client.owners.includes(interaction.user.id)) return await interaction.reply({
								embeds: [new Discord.MessageEmbed()
									.setAuthor({
										name: `Maintenance Mode On`,
										iconURL: interaction.user.displayAvatarURL({
											dynamic: true
										}),
										url: config_support.server_link
									})
									.setDescription(`>>> ${client.allEmojis.x} *Please use the bot after sometime! Currently bot is in **Maintenance Mode**!*`)
									.setColor(config.wrongcolor)
								]
							})
						} else {

							if (command.toggleOff) {
								return await interaction.reply({
									embeds: [new Discord.MessageEmbed()
										.setAuthor({
											name: `Command Disabled`,
											iconURL: interaction.user.displayAvatarURL({
												dynamic: true
											}),
											url: config_support.server_link
										})
										.setTitle(`>>> ${client.allEmojis.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
										.setColor(config.wrongcolor)
									]
								}).catch(() => {});
							}

							if (!interaction.member.permissions.has(command.userPermissions)) return await interaction.reply({
								embeds: [new Discord.MessageEmbed()
									.setAuthor({
										name: `Missing Permission`,
										iconURL: interaction.user.displayAvatarURL({
											dynamic: true
										}),
										url: config_support.server_link
									})
									.setDescription(`>>> ${client.allEmojis.x} **I do not have \`${command.userPermissions}\` permission to use \`${command.name}\` command!**`)
									.setColor(config.wrongcolor)
								],
								ephemeral: true
							}).catch(() => {});

							if (!interaction.guild.me.permissions.has(command.botPermissions)) return await interaction.reply({
								embeds: [new Discord.MessageEmbed()
									.setAuthor({
										name: `Missing Permission`,
										iconURL: interaction.user.displayAvatarURL({
											dynamic: true
										}),
										url: config_support.server_link
									})
									.setDescription(`>>> ${client.allEmojis.x} **I do not have \`${command.botPermissions}\` permission to use \`${command.name}\` command!**`)
									.setColor(config.wrongcolor)
								],
								ephemeral: true
							}).catch(() => {});

							if (functions.onCoolDown(interaction, command)) {
								return await interaction.reply({
									embeds: [new Discord.MessageEmbed()
										.setAuthor({
											name: `You are on Cooldown`,
											iconURL: interaction.user.displayAvatarURL({
												dynamic: true
											}),
											url: config_support.server_link
										})
										.setColor(config.wrongcolor)
										.setDescription(`>>> ${client.allEmojis.x} **Please wait \`${functions.onCoolDown(interaction, command).toFixed(1)} seconds\` Before using the \`${command.name}\` command again!.**`)
									],
									ephemeral: true
								});
							}
						}
						command.execute(client, interaction, args, config, embedcolor, prefix);

					} catch (e) {
						console.log(e);
						return interaction.channel.send({
							embeds: [new Discord.MessageEmbed()
								.setColor(config.wrongcolor)
								.setAuthor({
									name: `Error Occured`,
									iconURL: interaction.guild.iconURL({
										dynamic: true
									}),
									url: config_support.server_link
								})
								.setDescription(`>>> \`\`\`${e}\`\`\``)
							]
						});
					}

				}

			}

		} catch (e) {
			console.log(String(e.stack).bgRed);
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
