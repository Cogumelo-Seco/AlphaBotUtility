module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run({ playlistID, tracks, position }) {
        let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uris: tracks,
                position: position || 0
            })
        }).then(async(res) => res.status).catch(err => this.console.error(err))

        return res
    }
}