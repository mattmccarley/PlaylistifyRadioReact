var React = require('react');

class TrackResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.tracks &&
        <div>
          <h3>Tracks</h3>
          <ul>
            {this.props.tracks.items.map(track => {
              return (
                <li
                  key={track.id}
                  onClick={this.props.handleSeedSelect.bind(null, track, 'tracks')}
                >
                  <span className="track-results__track-name">{track.name}</span> by <span className="track-results__track-artist">{track.artists[0].name}</span>
                </li>
              )
            })}
          </ul>
        </div>
        }
      </div>
    )
  }
}

class ArtistResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.artists &&
        <div>
          <h3>Artists</h3>
          <ul>
            {this.props.artists.items.map(artist => {
              return (
                <li
                  key={artist.id}
                  onClick={this.props.handleSeedSelect.bind(null, artist, 'artists')}
                >
                  {artist.images.length > 0 &&
                  <img
                    className='artist-results__artist-image'
                    src={artist.images[artist.images.length - 1].url}
                    alt={artist.name}
                  />
                  }
                  {artist.name}
                </li>
              )
            })}
          </ul>
        </div>
        }
      </div>
    )
  }
}

class AlbumsResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Albums</h3>
        <ul>
        {this.props.albums &&
        this.props.albums.items.map(album => {
          return (
            <li
              key={album.id}
              onClick={this.props.handleSeedSelect.bind(null, album, 'albums')}
            >
              {album.images[album.images.length - 1] &&
                <img 
                  className="album-results__album-image"
                  src={album.images[album.images.length - 1].url}
                  alt=""
                />
              }
              <span>{album.name}</span> by <span>{album.artists[0].name}</span>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

class PlaylistResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p className="search-results__heading">Playlists</p>
        <ul>
        {this.props.playlists &&
        this.props.playlists.items.map(playlist => {
          return (
            <li
              key={playlist.id}
              onClick={this.props.handleSeedSelect.bind(null, playlist, 'playlists')}
            >
              {playlist.images.length > 0 &&
                <img 
                  className='playlist-results__playlist-image'
                  src={playlist.images[playlist.images.length - 1].url}
                  alt=""
                />
              }
              <span>{playlist.name}</span>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='row'>
        {this.props.searchResults &&
        <div className='row'>
          <TrackResults tracks={this.props.searchResults.tracks} handleSeedSelect={this.props.handleSeedSelect}></TrackResults>
          <ArtistResults artists={this.props.searchResults.artists} handleSeedSelect={this.props.handleSeedSelect}></ArtistResults>
          <AlbumsResults albums={this.props.searchResults.albums} handleSeedSelect={this.props.handleSeedSelect}></AlbumsResults>
          <PlaylistResults playlists={this.props.searchResults.playlists} handleSeedSelect={this.props.handleSeedSelect}></PlaylistResults>
        </div>
        }
      </div>
    )
  }
}

module.exports = SearchResults;