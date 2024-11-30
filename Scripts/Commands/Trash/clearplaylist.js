module.exports = {
    totalTimeout: 0,
    timeout: 0,
    names: [ 'clearplaylist' ],

    run: async ({ commands, channel, client, context, args, message, DB, functions }) => {
        if (!context.badges?.broadcaster) return

        let playlistInfo = await functions.spotifyGetPlaylistInfo(process.env.playlistID)

        let tracks = []
        for (let i in playlistInfo.tracks.items) {
            if (Number(i) <= 95) tracks.push({ uri: playlistInfo.tracks.items[i].track.uri })
        }

        if (!tracks[0]) return client.say(channel, `@${context['display-name']} A playlist já está limpa!!`)

        let result = await functions.spotifyRemoveTracksOfPlaylist({ playlistID: process.env.playlistID, tracks })

        if (result == 201 || result == 200)
            client.say(channel, `@${context['display-name']} Playlist limpa com sucesso!!`)
        else
            client.say(channel, `@${context['display-name']} Erro ao limpar a playlist. CODE: `+result)
    }
}