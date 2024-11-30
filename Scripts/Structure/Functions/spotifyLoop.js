module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run({ TWClient, lastTrackURI }) {
        let liveInfo = await this.getLiveInfo(process.env.channelID)
        
        //if (liveInfo?.online) {
            let playlistInfo = await this.spotifyGetPlaylistInfo(process.env.playlistID)
            let playerInfo = await this.spotifyGetPlaybackState()

            if (playerInfo) {
                let currentPlayedMusic = playerInfo.item
                if (!lastTrackURI) lastTrackURI = currentPlayedMusic.uri

                if (playerInfo.context?.uri == 'spotify:playlist:'+process.env.playlistID) {
                    if (currentPlayedMusic.uri != lastTrackURI) {
                        this.spotifyRemoveTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ { uri: lastTrackURI } ] })
                        lastTrackURI = currentPlayedMusic.uri
                    }
                }
                    
                if (playerInfo.context?.uri == 'spotify:playlist:'+process.env.playlistID && currentPlayedMusic.duration_ms-35000 <= playerInfo.progress_ms && playlistInfo?.tracks?.items.length <= 1) {
                    let randomTrack = await this.spotifySearchRandomMusic()
                    await this.spotifyAddTracksOfPlaylist({ playlistID: process.env.playlistID, tracks: [ randomTrack?.track.uri ], position: 1 })
                    TWClient.say('#coguteq', `A playlist estava vazia, então adicionei uma música. Nome: "${randomTrack.track.name || null}", Artista: "${randomTrack.track.artists[0].name || null}"`)
                }
            }
        //}

        setTimeout(() => this.spotifyLoop({ TWClient, lastTrackURI }), 15000)
    }
}