var React = require('react');

class User extends React.Component {
  render() {
    return (
      <div className='user'>
        <h2>{this.props.displayName}</h2>
        <p>
        {this.props.loggedIn ?
          'connected to Spotify' :
          'you are not logged in'
        }  
        </p>
      </div>
    )
  }
}

module.exports = User;