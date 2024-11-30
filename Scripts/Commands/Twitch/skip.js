class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 60000
        this.timeout = 0
        this.names = [ 'skip' ]
    }

    async run(context) {
        let playlistInfo = await this.functions.spotifyGetPlaylistInfo(process.env.playlistID)

        if (playlistInfo?.tracks?.items.length <= 1) {
            let randomTrackInfo = await this.functions.spotifySearchRandomMusic()
            await this.functions.spotifyAddTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ randomTrackInfo?.track.uri ], position: playlistInfo?.tracks?.items.length })
        }

        let res = await fetch(`https://api.spotify.com/v1/me/player/next`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`,
            }
        }).then(async(res) => res.status).catch(err => console.log(err))

        if (res == 204)
            this.TWClient.say(this.channel, `@${context['display-name']} Música pulada com sucesso!!`)
        else
            this.TWClient.say(this.channel, `@${context['display-name']} Erro ao pular música.`)
    }
}

module.exports = Command