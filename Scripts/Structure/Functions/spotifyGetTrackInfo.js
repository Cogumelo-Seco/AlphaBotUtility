module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run(trackID) {
        let res = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`
            }
        }).then(async(res) => res?.json() || res).catch(err => this.console.error(err))

        return res
    }
}