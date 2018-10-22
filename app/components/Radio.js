var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var User = require('./User');
var Search = require('./Search');


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
      }
    }

    this.handleSeedSelect = this.handleSeedSelect.bind(this);
  }

  componentDidMount() {
    this.getUser();
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

  handleSeedSelect(seed, seedType) {
    var newSeeds = this.state.seeds[seedType];
    if (!newSeeds.includes(seed)) {
      newSeeds.push(seed);
    }

    var newState = {
      seeds: null
    }[seedType] = newSeeds;

    this.setState(function () {
      return newState;
    });
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
        <Search token={this.state.token} handleSeedSelect={this.handleSeedSelect}></Search>
      </div>
    )
  }
}

module.exports = Radio;