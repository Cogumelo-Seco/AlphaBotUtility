const { EmbedBuilder } = require('discord.js');

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.names = [ 't', 'test' ]
    }

    async run(message) {
        console.log((await message.guild.members.fetch('741352048271818823')).presence.activities.values())

    }
}

module.exports = Command