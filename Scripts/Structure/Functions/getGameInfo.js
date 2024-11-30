module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run(gameName) {
        let res = await fetch(`https://api.twitch.tv/helix/games?name=${gameName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.appTOKEN}`,
                'Client-Id': process.env.appID,
                'Content-Type':'application/json'
            }
        }).then(res => res?.json() || res).catch(err => this.console.error(err))

        return res?.data[0]
    }
}