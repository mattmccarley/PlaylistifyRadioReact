var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var User = require('./User');
var Tunings = require('./Tunings');
var Search = require('./Search');
var Seeds = require('./Seeds');
var Player = require('./Player');


class Radio extends React.Component {
  constructor(props) {
    super(props);
    var params = this.getHashParams();
    var token = params.access_token;
    
    this.state = {
      loggedIn: token ? true : false,
      token: token,
      userData: null,
      seeds: {
        tracks: [],
        artists: [],
        albums: [],
        playlists: []
      },
      tunings: {
        acousticness: 0.5,
        danceability: 0.5,
        energy: 0.5,
        instrumentalness: 0.5,
        loudness: 0.5,
        popularity: 0.5,
        valence: 0.5
      },
      player: {
        tracks: [],
        devices: [],
        playlist: null
      }
    }

    this.handleSeedSelect = this.handleSeedSelect.bind(this);
    this.handleTuningAdjustment = this.handleTuningAdjustment.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.sendTracksToActivePlayer = this.sendTracksToActivePlayer.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getDevices();
    this.createPlaylist();
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getUser() {
    var token = this.state.token;
    api.getMe(token)
    .then(function (userData) {
      this.setState(function () {
        return {
          userData: userData
        }
      })
    }.bind(this));
  }

  getDevices() {
    var token = this.state.token;
    api.getDevices(token)
      .then(function(deviceData) {
        var newState = this.state;
        newState.player.devices = deviceData.devices;
        this.setState(function () {
          return newState;
        });
      }.bind(this));
  }

  getUserPlaylists() {
    var token = this.state.token;
    api.getUserPlaylists(token)
      .then(function(data) {
        var newState = this.state;
        newState.userPlaylists = data;
        this.setState(function () {
          return newState;
        });
      }.bind(this));
  }

  createPlaylist() {
    var token = this.state.token;
    api.getUserPlaylists(token)
      .then(function(data) {
        var myPlaylist = data.items.filter(playlist => {
          return playlist.name === 'PlaylistifyRadio :: Queue';
        });

        if (myPlaylist.length === 0) {
          var token = this.state.token;
          api.createPlaylist(token)
            .then(function(data) {
              var newState = this.state;
              newState.player.playlist = data;
              this.setState(function () {
                return newState;
              })
            }.bind(this));
        } else {
          var newState = this.state;
          newState.player.playlist = myPlaylist[0];
          this.setState(function () {
            return newState;
          });
        }
    }.bind(this));
  }
  

  handleSeedSelect(seed, seedType) {
    var newState = {
      seeds: this.state.seeds
    };
    var newSeeds = this.state.seeds[seedType];

    if (!newSeeds.includes(seed)) {
      newSeeds.push(seed);
    }

    newState.seeds[seedType] = newSeeds;

    this.setState(function () {
      return newState;
    }, this.getTracks);
  }

  handleTuningAdjustment(event) {
    var newTunings = this.state.tunings;
    newTunings[event.target.getAttribute('name')] = event.target.value;

    this.setState(function () {
      return newTunings;
    }, this.getTracks);
  }

  getTracks() {
    var token = this.state.token;
    var seeds = this.state.seeds;
    var tunings = this.state.tunings;
    api.getRecommendations(token, seeds, tunings)
    .then(function (recommendationsData) {
      var newState = this.state;
      newState.player.tracks = recommendationsData.tracks;
      this.setState(function () {
        return newState;
      });

    }.bind(this));
  }

  sendTracksToActivePlayer() {
    var token = this.state.token;
    var tracks = this.state.player.tracks;
    api.play(token, tracks);
  }

  render() {
    return (
      <div>
        {this.state.userData &&
          <User
            displayName={this.state.userData.display_name}
            loggedIn={this.state.loggedIn}>
          </User>
        }
        <Player
          tracks={this.state.player.tracks}
          devices={this.state.player.devices}
          sendTracksToActivePlayer={this.sendTracksToActivePlayer}
        ></Player>
        <Tunings tunings={this.state.tunings} handleTuningAdjustment={this.handleTuningAdjustment}></Tunings>
        <Seeds seeds={this.state.seeds}></Seeds>
        <Search token={this.state.token} handleSeedSelect={this.handleSeedSelect}></Search>
      </div>
    )
  }
}

module.exports = Radio;