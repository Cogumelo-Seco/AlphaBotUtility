class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'randomplay', 'rp' ]
    }

    async run(context) {
        let playlistInfo = await this.functions.spotifyGetPlaylistInfo(process.env.playlistID)
        let randomTrackInfo = await this.functions.spotifySearchRandomMusic()
        let result = await this.functions.spotifyAddTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ randomTrackInfo?.track.uri ], position: playlistInfo?.tracks?.items.length })

        if (result == 201 || result == 200)
            this.TWClient.say(this.channel, `@${context['display-name']} Música aleatória adicionada a playlist com sucesso!! Nome: "${randomTrackInfo?.track.name || null}", Artista: "${randomTrackInfo?.track.artists[0].name || null}"`)
        else
            this.TWClient.say(this.channel, `@${context['display-name']} Erro ao adicionar música. CODE: `+result)
    }
}

module.exports = Command