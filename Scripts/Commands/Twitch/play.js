class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'play', 'p', 'sr' ]
    }

    async run(context) {
        let trackName = this.args.join(' ');
        if (!trackName) return;

        let idIfUrl = (trackName.split('/')[trackName.split('/').length-1]).split('?')[0]
        let trackList = await this.functions.spotifyGetTrackList(trackName)
        let trackInfo = await this.functions.spotifyGetTrackInfo(trackList ? trackList[0]?.id || idIfUrl : idIfUrl)

        if (!trackInfo || trackInfo.error) return this.TWClient.say(this.channel, `@${context['display-name']} Não encontrei nenhuma música.`)

        let playlistInfo = await this.functions.spotifyGetPlaylistInfo(process.env.playlistID)
        let playlistLiveInfo = await this.functions.spotifyGetPlaylistInfo(process.env.playlistLiveID)

        if (playlistInfo?.tracks?.items.find(item => item.track.uri == trackInfo.uri)) return this.TWClient.say(this.channel, `@${context['display-name']} Esta música já está na playlist.`)
        let result = await this.functions.spotifyAddTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ trackInfo.uri ], position: playlistInfo?.tracks?.items.length })

        if (result == 201 || result == 200) {
            this.TWClient.say(this.channel, `@${context['display-name']} Música adicionada a playlist com sucesso!! Nome: "${trackInfo.name || null}", Artista: "${trackInfo.artists[0].name || null}"`)

            this.DB.lowDB.lastMusicFromUser[context['user-id']] = trackInfo.uri
        } else
            this.TWClient.say(this.channel, `@${context['display-name']} Erro ao adicionar música. CODE: `+result)

        if (!playlistLiveInfo?.tracks?.items.find(item => item.track.uri == trackInfo.uri))
            this.functions.spotifyAddTracksOfPlaylist({ playlistID: process.env.playlistLiveID, tracks: [ trackInfo.uri ], position: playlistLiveInfo?.tracks?.items.length })
    }
}

module.exports = Command