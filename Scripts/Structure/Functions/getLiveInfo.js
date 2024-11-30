module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run(channelID) {
        let res = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${channelID}`, {
            method: 'GET',
            json: true,
            headers: {
                'Authorization': `Bearer ${process.env.appTOKEN}`,
                'Client-Id': process.env.appID,
                'Content-Type':'application/json'
            }
        }).then(res => res?.json() || res).catch(err => this.console.error(err))

        let res2 = await fetch(`https://api.twitch.tv/helix/streams?user_id=${channelID}`, {
            method: 'GET',
            json: true,
            headers: {
                'Authorization': `Bearer ${process.env.appTOKEN}`,
                'Client-Id': process.env.appID,
                'Content-Type':'application/json'
            }
        }).then(res => res.json()).catch(err => null)

        let liveInfo = res?.data ? res?.data[0] || null : null
        if (liveInfo) liveInfo.online = res2?.data[0] ? true : false

        return liveInfo
    }
}