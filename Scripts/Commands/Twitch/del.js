class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'del', 'efm', 'remove', 'rm', 'delete' ]
    }

    async run(context) {
        let trackURI = this.DB.lowDB.lastMusicFromUser[context['user-id']]
        let trackInfo = await this.functions.spotifyGetTrackInfo(trackURI.replace('spotify:track:', ''))
        let result = await this.functions.spotifyRemoveTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ { uri: trackURI } ] })

        if (trackInfo && result == 200)
            this.TWClient.say(this.channel, `@${context['display-name']} Música removida da playlist com sucesso!! Nome: "${trackInfo.name || null}", Artista: "${trackInfo.artists[0].name || null}"`)
        else 
            this.TWClient.say(this.channel, `@${context['display-name']} Erro ao remover música da playlist.`)
    }
}

module.exports = Command