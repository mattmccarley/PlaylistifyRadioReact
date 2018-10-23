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
  },

  getRecommendations: function (token, seeds, tunings) {
    spotifyApi.setAccessToken(token);
    var options = {
      limit: 5,
      seed_artists: seeds.artists.map(artist => artist.id).join(','),
      seed_tracks: seeds.tracks.map(track => track.id).join(','),
    }
    Object.keys(tunings).forEach(key => {
      options[key] = tunings[key];
    });
    console.log(options);

    return spotifyApi.getRecommendations(options)
      .then(function (response) {
        return response;
      });
  },

  getDevices: function (token) {
    spotifyApi.setAccessToken(token);
    return spotifyApi.getMyDevices()
      .then(function (response) {
        return response;
      });
  },

  play: function (token, tracks) {
    spotifyApi.setAccessToken(token);
    options = {
      uris: tracks.map(track => {
        return `spotify:track:${track.id}`;
      })
    }
    return spotifyApi.play(options)
      .then(function (response) {
        return response;
      })
  },

  getUserPlaylists: function (token) {
    spotifyApi.setAccessToken(token);
    var options = {
      limit: 50
    }
    return spotifyApi.getUserPlaylists(options)
      .then(function (response) {
        return response;
      });
  },

  createPlaylist: function (token) {
    spotifyApi.setAccessToken(token);
    var options = {
      name: 'PlaylistifyRadio :: Queue'
    }

    return spotifyApi.createPlaylist(options)
      .then(function (response) {
        return response;
      });
  }
}