
let express = require('express')

var client_id = process.env.SpotifyClientID
var client_secret = process.env.SpotifyClientSecret
var redirect_uri = 'http://localhost:3000/callback'

var app = express()
app.listen('3000')

app.get('/', function(req, res) {
    let scope = 'user-modify-playback-state user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state';

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${Math.random().toString(36).substring(2)}`);
})

app.get('/callback', async function(req, res) {
    let code = req.query.code

    fetch(`https://accounts.spotify.com/api/token?code=${req.query.code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`, {
        method: 'POST',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    }).then(async(res) => {
        let data = await res.json()
        console.log(data)
    }).catch(err => console.log(err))
})