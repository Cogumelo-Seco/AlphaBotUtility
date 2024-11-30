module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run() {
        await fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${process.env.SpotifyRefreshToken}`, {
            method: 'POST',
            headers: {
                grant_type: 'refresh_token',
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(process.env.SpotifyClientID + ':' + process.env.SpotifyClientSecret).toString('base64'))
            },
            json: true
        }).then(async(res) => {
            let spotifyAccessData = await res.json()
            process.env.SpotifyAccessToken = spotifyAccessData.access_token
            this.console.logSP('Conectado com Spotify')
        }).catch(err => this.console.error(err))

        setTimeout(this.refreshSpotifyTokenLoop, 1800000)
    }
}