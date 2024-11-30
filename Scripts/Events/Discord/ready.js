module.exports = async([ DCClient ], { functions, TWClient }) => {
    functions.console.logDC(`Conectado com Discord. User: ${DCClient.user.username}`);

    setInterval(async() => {
        let liveInfo = await functions.getLiveInfo(process.env.channelID)

        DCClient.user.setPresence({
            activities: [
                {
                    name: liveInfo?.online ? liveInfo?.title || 'Assista um streamer random aí' : 'Assista um streamer random aí',
                    type: 1,
                    url: 'https://www.twitch.tv/coguteq'

                    /*name: 'Spotify',
                    type: 2,
                    url: null,
                    details: 'Star Sky',
                    state: 'Two Steps from Hell; Thomas Bergersen',
                    applicationId: null,
                    timestamps: [Object],
                    party: [Object],
                    syncId: '06AMpcajziFnEKniV25fiU',
                    assets: [RichPresenceAssets],
                    flags: [ActivityFlagsBitField],
                    emoji: null,
                    buttons: [],
                    createdTimestamp: 1707264117589*/
                }
            ]
        })
    }, 10000)
}