var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Connect to Spotify to get started</h1>
        <a href="http://localhost:8888/login">Connect to Spotify</a>
      </div>
    )
  }
}

module.exports = Home;