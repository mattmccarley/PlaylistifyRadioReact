var React = require('react');

class TrackSeeds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Tracks</h3>
        <ul>
          {this.props.tracks.length > 0 &&
            this.props.tracks.map(track => {
              return (
                <li key={track.id}>
                  {track.name} by {track.artists[0].name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class ArtistSeeds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Artists</h3>
        <ul>
          {this.props.artists.length > 0 &&
            this.props.artists.map(artist => {
              return (
                <li key={artist.id}>
                  {artist.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class AlbumSeeds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Albums</h3>
        <ul>
          {this.props.albums.length > 0 &&
            this.props.albums.map(album => {
              return (
                <li key={album.id}>
                  {album.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class PlaylistSeeds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Playlists</h3>
        <ul>
          {this.props.playlists.length > 0 &&
            this.props.playlists.map(playlist => {
              return (
                <li key={playlist.id}>
                  {playlist.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class Seeds extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='seeds'>
        <h2>Current Seeds</h2>
        <div className='row'>
          <TrackSeeds tracks={this.props.seeds.tracks}></TrackSeeds>
          <ArtistSeeds artists={this.props.seeds.artists}></ArtistSeeds>
          {/* <AlbumSeeds albums={this.props.seeds.albums}></AlbumSeeds> */}
          {/* <PlaylistSeeds playlists={this.props.seeds.playlists}></PlaylistSeeds> */}
        </div>
      </div>
    )
  }
}

module.exports = Seeds;