import { Component } from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'

import Movie from '../Movie/Movie'
import Spinner from '../Spinner/Spinner'
import MovieSearch from '../MovieSearch/MovieSearch'
import ErrorAlert from '../Errors/ErrorAlert'
import './MoviesList.css'
import { MoviesServiceConsumer } from '../Movies-service-context/Movies-service-context'

export default class MoviesList extends Component {
  static propTypes = {
    name: PropTypes.string,
    guestSessionId: PropTypes.string,
    moviesServiceData: PropTypes.object,
    moviesServiceSession: PropTypes.object,
  }

  state = {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    total: 0,
    query: '',
    pageNum: 1,
    notFound: false,
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  otherPage = (num) => {
    this.setState({
      page: num,
    })
  }

  changeQuery = (string) => {
    this.setState({
      query: string,
      page: 1,
    })
  }

  componentDidMount() {
    this.updateList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.updateList()
    }
  }

  updateList() {
    this.setState({
      loading: true,
      notFound: false,
    })
    if (this.props.name === 'Search') {
      this.props.moviesServiceData
        .getMovies(this.state.query, this.state.page)
        .then((items) => {
          if (items.total_results > 10000) {
            items.total_results = 10000
          }
          this.setState({
            movies: items.results,
            loading: false,
            total: items.total_results,
            pageNum: items.total_pages,
          })
          if (!items.total_results) {
            this.setState({
              error: false,
              notFound: true,
            })
          }
        })
        .catch(this.onError)
    } else {
      this.props.moviesServiceSession
        .getRatedMovies(this.props.guestSessionId, this.state.page)
        .then((items) => {
          if (!items.total_results) {
            this.setState({
              movies: [],
              loading: false,
              total: 0,
              notFound: true,
            })
            return
          }
          this.setState({
            movies: items.results,
            loading: false,
            total: items.total_results,
            pageNum: items.total_pages,
          })
        })
        .catch(this.onError)
    }
  }

  render() {
    const { movies, loading, error, page, pageNum, total, notFound } = this.state
    const el = movies.map((item) => {
      return (
        <li key={item.id} className="movie">
          <MoviesServiceConsumer>
            {([genresAll, moviesServiceSession, guestSessionId]) => {
              return (
                <Movie
                  title={item.title}
                  avgRate={item.vote_average}
                  poster={item.poster_path}
                  description={item.overview}
                  date={item.release_date}
                  genresAll={genresAll}
                  genreIds={item.genre_ids}
                  guestSessionId={guestSessionId}
                  movieId={item.id}
                  moviesServiceSession={moviesServiceSession}
                />
              )
            }}
          </MoviesServiceConsumer>
        </li>
      )
    })

    const spinner = loading ? <Spinner /> : null
    const content = !loading ? [el] : null
    const errorLoad = error ? <ErrorAlert message="Load error" description="No data" type="error" /> : null
    const errorSearch = notFound ? <ErrorAlert message="Oops!" description="Nothing was found" type="info" /> : null

    return (
      <div className="container">
        {this.props.name === 'Search' ? <MovieSearch changeQuery={this.changeQuery} /> : null}
        <ul className="movies-list">
          {spinner}
          {content}
          {errorLoad}
          {errorSearch}
        </ul>
        {!loading && pageNum != 1 ? (
          <Pagination
            defaultCurrent={page}
            onChange={(num) => this.otherPage(num)}
            total={total}
            showSizeChanger={false}
            defaultPageSize={20}
            style={{ marginBottom: '18px' }}
          />
        ) : null}
      </div>
    )
  }
}
