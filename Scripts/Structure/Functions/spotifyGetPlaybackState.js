module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run() {
        let res = await fetch(`https://api.spotify.com/v1/me/player`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`
            }
        }).then(async(res) => res?.json() || res).catch(err => null)

        return res
    }
}