const { EmbedBuilder } = require('discord.js');

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.names = [ 'p', 'play' ]
    }

    async run(message) {
        let trackName = this.args.join(' ')
        let trackResponseInfo = await this.VKClient.search(trackName)
        
        const player = this.VKClient.createPlayer({
            guildId: message.guild.id,
            voiceChannelId: message.member.voice.channelId,
            textChannelId: message.channel.id,
            selfDeaf: true
        });

        if (trackResponseInfo.loadType === "LOAD_FAILED") return message.reply(`:x: Load failed. Error: ${trackResponseInfo.exception.message}`);
        if (trackResponseInfo.loadType === "NO_MATCHES") return message.reply(':x: No matches!');

        player.connect();

        if (trackResponseInfo.loadType === 'PLAYLIST_LOADED') {
            for (const track of trackResponseInfo.tracks) {
                track.setRequester(message.author);
                player.queue.add(trackName);
            }
          
            message.reply(`Playlist \`${res.playlistInfo.name}\``);
        } else {
            const track = trackResponseInfo.tracks[0];
            track.setRequester(message.author);

            player.queue.add(track);
            message.reply(`Adicionado a fila \`${track.title}\``);
        }

        if (!player.playing) player.play();
    }
}

module.exports = Command