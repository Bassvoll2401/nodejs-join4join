const Discord = require("discord.js");
const config = require("../config");
const getUser = require("../api/methods/getUser");

module.exports = {
    name: "balance",
    description: "See your balance.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const user_ = await getUser(message.user.id);

        if (user_ && user_.success === true) {
            const recentTransactions = user_.data.transactions.slice(0, 5);
            const formattedTransactions = recentTransactions.map((entry, index) => entry.history).join("\n");

            const emb = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle('join4join.xyz | Balance')
                .setURL(config.url)
                .setDescription(`You have \`${user_.data.coins}\` coins\n> Earn more coins here [join4join.xyz/](https://join4join.xyz/)`)
                .setThumbnail(bot.user.displayAvatarURL())
                .addFields([
                    { name: "Recent Transactions", value: formattedTransactions || "No recent transactions available." }
                ])
                .setFooter({ text: config.footer })
                .setTimestamp();

            message.reply({ embeds: [emb] });
        } else {
            console.log(user_);
        }
    }
};
