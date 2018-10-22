var axios = require('axios');
var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

module.exports = {
  getMe: function (token) {
    spotifyApi.setAccessToken(token);
    
    return spotifyApi.getMe()
      .then(function (response) {
        return response;
      });
  },

  search: function (token, searchString) {
    spotifyApi.setAccessToken(token);

    return spotifyApi.search(searchString, ['album', 'artist', 'playlist', 'track'], {limit: 5})
      .then(function (response) {
        return response;
      });
  }
}