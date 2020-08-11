require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
});


var client_id = process.env.CLIENT_ID; // CLIENT ID
var redirect_uri = process.env.REDIRECT_URL; // REDIRECT URI - SET ON SPOTIFY DASHBOARD
var client_secret = process.env.CLIENT_SECRET; // CLIENT SECRET ID
var scope = 'user-read-private user-top-read user-read-currently-playing user-read-private user-modify-playback-state'; // SCOPES WHICH WILL BE QUERYED



const mainController = {

    home: (req, res) => {
        res.render('index');
    },

    login: (req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            'response_type=code' +
            '&client_id=' + client_id +
            (scope ? '&scope=' + encodeURIComponent(scope) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri));
    },

    callback: (req, res) => {
        console.log('Connexion réussie');
        res.locals.code = req.query.code;
        //spotifyApi.accessToken = res.locals.code;
        console.log(spotifyApi.accessToken);
        spotifyApi.authorizationCodeGrant(res.locals.code).then(
            function (data) {
                // Set the access token and refresh token
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);

                // Save the amount of seconds until the access token expired
                tokenExpirationEpoch =
                    new Date().getTime() / 1000 + data.body['expires_in'];
                console.log(
                    'Retrieved token. It expires in ' +
                    Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
                    ' seconds!'
                );
            },
            function (err) {
                console.log(
                    'Something went wrong when retrieving the access token!',
                    err.message
                );
            }
        );
        res.redirect('/');
    },

    topArtists: (req, res) => {
        const timeRange = req.query.time_range;
        spotifyApi.getMyTopArtists({
                limit: 50,
                offset: 0,
                time_range: timeRange
            })
            .then((data) => {
                // Output items
                res.render('artists', {
                    artists: data.body.items,
                    timeRange
                })
            }, (err) => {
                console.log('Something went wrong!', err);
            });
    },

    topTracks: (req, res) => {
        const timeRange = req.query.time_range;
        spotifyApi.getMyTopTracks({
                limit: 50,
                offset: 0,
                time_range: timeRange
            })
            .then(function (data) {
                // Output items
                res.render('tracks', {
                    tracks: data.body.items,
                    timeRange
                })
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }

}

module.exports = mainController;
/*
app.get('/', (req, res) => {
    res.render('index');
});


app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
        'response_type=code' +
        '&client_id=' + client_id +
        (scope ? '&scope=' + encodeURIComponent(scope) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', (req, res) => {
    console.log('Connexion réussie');
    res.redirect('/');
});

app.get('/artists', (req, res) => {
    let url = 'https://api.spotify.com/v1/me/top/artists?offset=20';
    request(url, (error, response, body) => {
        artists_json = JSON.parse(body);
        console.log(artists_json);

        res.render('index');
    });

})*/