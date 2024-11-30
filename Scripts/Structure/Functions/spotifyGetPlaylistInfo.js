module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run(playlistID) {
        let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`
            }
        }).then(async(res) => res?.json()).catch(err => null)

        return res
    }
}