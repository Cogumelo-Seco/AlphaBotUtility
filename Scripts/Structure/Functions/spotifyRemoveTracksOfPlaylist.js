module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run({ playlistID, tracks }) {
        let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tracks
            })
        }).then(async(res) => res.status).catch(err => this.console.error(err))

        return res
    }
}