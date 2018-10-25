var React = require('react');
var api = require('../utils/api');
var SearchResults = require('./SearchResults');
var debounce = require('lodash.debounce');

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
      searchResults: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchSpotify = debounce(this.searchSpotify.bind(this), 400);
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }
  
  searchSpotify(searchString) {
    api.search(this.state.token, searchString)
    .then((response) => {
      this.updateSearchResults(response);
    })
  }

  updateSearchResults(searchResults) {
    this.setState(function() {
      return {
        searchResults: searchResults
      }
    });
  }
  
  handleChange(event) {
    this.searchSpotify(event.target.value);
  }

  render() {
    return (
      <div className='search'>
        <h2>Search</h2>
        <input type="text" onChange={this.handleChange}/>
        <SearchResults
          searchResults={this.state.searchResults}
          handleSeedSelect={this.props.handleSeedSelect}
        ></SearchResults>
      </div>
    )
  }
}

module.exports = Search;