const { EmbedBuilder } = require('discord.js');

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.names = [ 'ping' ]
    }

    async run(message) {
        let responsePingTimestamp = +new Date()-message.pingTimestamp

        let embed = new EmbedBuilder()
            .setColor(process.env.color1)
            .setTitle(`🐧 | Pingo!`)
            .setDescription(`**⏱️ | Tempo de resposta:** \`${responsePingTimestamp}ms\`\n**📝 | Tempo de edição:** \`???\`\n**⚡ | Ping de conexão:** \`${Math.round(this.DCClient.ws.ping)}ms\``)

        let msg = await message.reply({ embeds: [embed] })

        if (!msg) return

        let editPingTimestamp = +new Date()

        embed.setDescription(`**⏱️ | Tempo de resposta:** \`${responsePingTimestamp}ms\`\n**📝 | Tempo de edição:** \`???\`\n**⚡ | Ping de conexão:** \`${Math.round(this.DCClient.ws.ping)}ms\``)
        await msg.edit({ embeds: [embed] }).catch(() => null)

        embed.setDescription(`**⏱️ | Tempo de resposta:** \`${responsePingTimestamp}ms\`\n**📝 | Tempo de edição:** \`${+new Date()-editPingTimestamp}ms\`\n**⚡ | Ping de conexão:** \`${Math.round(this.DCClient.ws.ping)}ms\``)
        msg.edit({ embeds: [embed] }).catch(() => null)
    }
}

module.exports = Command