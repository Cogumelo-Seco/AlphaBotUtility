module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run() {
        let playlistsIDs = [
            '37i9dQZF1E3abyCajS5Uey', //1
            '37i9dQZF1E39gUsLhE8Mev', //2
            '37i9dQZF1E3902JAsWpdjk', //3
            '37i9dQZF1E34XEBixIZ8G5', //4
            '37i9dQZF1E37j5pqetdXdE', //5
            '37i9dQZF1E34ZoG8fUDLpc', //6

            //'37i9dQZF1Fa1IIVtEpGUcU', //Playlist 2023
            '1P4JwIsUT24m0ZGQMRZq2h', //PLaylistLive
            '1P4JwIsUT24m0ZGQMRZq2h', //PLaylistLive
            '1P4JwIsUT24m0ZGQMRZq2h',
            '1P4JwIsUT24m0ZGQMRZq2h'
        ]
        let randomPlayList = playlistsIDs[Math.floor(Math.random()*playlistsIDs.length)]
        let playlistInfo = await this.spotifyGetPlaylistInfo(randomPlayList)
        let playlistsTracks = playlistInfo?.tracks.items
        let randomTrack = playlistsTracks[Math.floor(Math.random()*playlistsTracks?.length)]

        return randomTrack
    }
}