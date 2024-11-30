class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'currentplaying', 'cp', 'musica', 'song' ]
    }

    async run(context) {
        let playerInfo = await this.functions.spotifyGetPlaybackState()

        if (playerInfo?.item) {
            let trackInfo = playerInfo?.item
            this.TWClient.say(this.channel, `@${context['display-name']} Musica atual: Nome: "${trackInfo.name}" Artista: "${trackInfo.artists[0].name}" URL: ${trackInfo.external_urls.spotify}`)
        } else this.TWClient.say(this.channel, `@${context['display-name']} Erro ao coletar dados da música atual.`)
    }
}

module.exports = Command