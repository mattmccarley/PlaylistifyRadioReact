var React = require('react');

class TrackResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p className="search-results__heading">Tracks</p>
        <ul>
          {this.props.searchResults &&
          this.props.searchResults.tracks.items.map(track => {
            return (
              <li key={track.id}>
                <span className="track-results__track-name">{track.name}</span> by <span className="track-results__track-artist">{track.artists[0].name}</span>
              </li>
            )
          })}
        </ul>
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
        <p className="search-results__heading">Artists</p>
        <ul>
        {this.props.searchResults &&
        this.props.searchResults.artists.items.map(artist => {
          return (
            <li
              className="artist-results__artist-item"
              key={artist.id}
            >
              {artist.images[artist.images.length - 1] &&
                <img 
                  className="artist-results__artist-image"
                  src={artist.images[artist.images.length - 1].url}
                  alt=""
                />
              }
              <span>{artist.name}</span>
            </li>
          )
        })}
        </ul>
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
        <p className="search-results__heading">Albums</p>
        <ul>
        {this.props.searchResults &&
        this.props.searchResults.albums.items.map(album => {
          return (
            <li
              key={album.id}
            >
              {album.images[album.images.length - 2] &&
                <img 
                  className="album-results__album-image"
                  src={album.images[album.images.length - 2].url}
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
        {this.props.searchResults &&
        this.props.searchResults.playlists.items.map(playlist => {
          return (
            <li
              key={playlist.id}
            >
              {playlist.images[0] &&
                <img 
                  className=""
                  src={playlist.images[0].url}
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
      <div>
        <TrackResults searchResults={this.props.searchResults}></TrackResults>
        <ArtistResults searchResults={this.props.searchResults}></ArtistResults>
        <AlbumsResults searchResults={this.props.searchResults}></AlbumsResults>
        <PlaylistResults searchResults={this.props.searchResults}></PlaylistResults>
      </div>
    )
  }
}

module.exports = SearchResults;