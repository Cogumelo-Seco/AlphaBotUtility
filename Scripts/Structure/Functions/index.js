class Functions {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }


    getChannelInfo = async(props) => new (require('./getChannelInfo'))(this).run(props)
    getLiveInfo = async(props) => new (require('./getLiveInfo'))(this).run(props)
    getGameInfo = async(props) => new (require('./getGameInfo'))(this).run(props)

    spotifyGetTrackList = async(props) => new (require('./spotifyGetTrackList'))(this).run(props)
    spotifyGetTrackInfo = async(props) => new (require('./spotifyGetTrackInfo'))(this).run(props)
    spotifyGetPlaylistInfo = async(props) => new (require('./spotifyGetPlaylistInfo'))(this).run(props)
    spotifyGetPlaybackState = async(props) => new (require('./spotifyGetPlaybackState'))(this).run(props)
    spotifyAddTracksOfPlaylist = async(props) => new (require('./spotifyAddTracksOfPlaylist'))(this).run(props)
    spotifyRemoveTracksOfPlaylist = async(props) => new (require('./spotifyRemoveTracksOfPlaylist'))(this).run(props)
    spotifySearchRandomMusic = async(props) => new (require('./spotifySearchRandomMusic'))(this).run(props)


    refreshSpotifyTokenLoop = async(props) => new (require('./refreshSpotifyTokenLoop'))(this).run(props)
    spotifyLoop = async(props) => new (require('./spotifyLoop'))(this).run(props)

    formatDate = (...props) => new (require('./formatDate'))(this).run(props)
    coguMoneyShowData = (...props) => new (require('./coguMoneyShowData'))(this).run(props)
    coguMoneyMessage = (...props) => new (require('./coguMoneyMessage'))(this).run(props)

    console = new (require('./console'))(this)
}

module.exports = Functions