import { Component } from 'react'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import './MovieSearch.css'

export default class MovieSearch extends Component {
  static propTypes = {
    changeQuery: PropTypes.func,
  }

  onSearchInput = debounce((e) => {
    if (e.target.value.trim() === '') {
      this.props.changeQuery('')
      return
    }
    this.props.changeQuery(e.target.value)
  }, 1000)

  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Type to search..."
          onInput={this.onSearchInput}
        ></input>
      </div>
    )
  }
}
