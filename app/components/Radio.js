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
      userData: null
    }
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

  render() {
    return (
      <div>
        {this.state.userData &&
          <User
            displayName={this.state.userData.display_name}
            loggedIn={this.state.loggedIn}>
          </User>
        }
        <Search token={this.state.token}></Search>
      </div>
    )
  }
}

module.exports = Radio;