module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run(name) {
        let res = await fetch(`https://api.spotify.com/v1/search?q=${name.replace(/[^A-Za-z0-9]/g, '')}&type=track`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SpotifyAccessToken}`
            }
        }).then(res => res?.json() || res).catch(err => this.console.error(err))

        return res?.tracks?.items
    }
}