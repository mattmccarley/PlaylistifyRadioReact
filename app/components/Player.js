var React = require('react');

class Devices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Devices</h3>
        {this.props.devices.length > 0 && 
        <ul>
          {this.props.devices.map(device => {
            return (
              <li key={device.id}>{device.name}</li>
            )
          })}
        </ul>
        }
      </div>
    )
  }
}

class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Queue</h3>
        {this.props.tracks &&
        <ul>
          {this.props.tracks.map(track => {
            return (
              <li
                key={track.id}
              >{track.name}</li>
            )
          })}
        </ul>
        }

      </div>
    )
  }
}

class Player extends React.Component {
  constructor(props) { 
    super(props);
  }

  render() {
    return (
      <div className='player'>
        <h2>Player</h2>
        <Devices devices={this.props.devices}></Devices>
        <Queue tracks={this.props.tracks}></Queue>
      </div>
    )
  }
}

module.exports = Player;