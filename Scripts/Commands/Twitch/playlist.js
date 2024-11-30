class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'playlist' ]
    }

    async run(context) {
        this.TWClient.say(this.channel, `@${context['display-name']} Playlist dinâmica: https://open.spotify.com/playlist/${process.env.playlistID}`)
        this.TWClient.say(this.channel, `@${context['display-name']} Playlist de histórico do chat: https://open.spotify.com/playlist/${process.env.playlistLiveID}`)
    }
}

module.exports = Command