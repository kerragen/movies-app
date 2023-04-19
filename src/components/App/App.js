import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Tabs } from 'antd'

import { MoviesServiceProvider, MoviesServiceConsumer } from '../Movies-service-context/Movies-service-context'
import ErrorNetwork from '../Errors/ErrorNetwork'
import MoviesList from '../MoviesList/MoviesList'
import MoviesService from '../../services/MoviesService'
import './App.css'

const items = [
  {
    key: '1',
    label: 'Search',
    children: (
      <MoviesServiceConsumer>
        {([, , guestSessionId]) => {
          return <MoviesList guestSessionId={guestSessionId} name={items[0].label} />
        }}
      </MoviesServiceConsumer>
    ),
  },
  {
    key: '2',
    label: 'Rated',
    children: (
      <MoviesServiceConsumer>
        {([, , guestSessionId]) => {
          return <MoviesList guestSessionId={guestSessionId} name={items[1].label} />
        }}
      </MoviesServiceConsumer>
    ),
  },
]

export default class App extends Component {
  moviesService = new MoviesService()

  state = {
    genres: [],
    guestSessionId: '',
  }

  componentDidMount() {
    localStorage.clear()
    this.moviesService.createGuestSession().then((response) => {
      this.setState({
        guestSessionId: response.guest_session_id,
      })
    })
    this.moviesService.getGenre().then((response) => {
      this.setState({
        genres: response.genres,
      })
    })
  }

  render() {
    return (
      <div className="main">
        <MoviesServiceProvider value={[this.state.genres, this.moviesService, this.state.guestSessionId]}>
          <Online>
            <Tabs defaultActiveKey="1" centered items={items} className="tabs" size="large" />
          </Online>
          <Offline>
            <ErrorNetwork />
          </Offline>
        </MoviesServiceProvider>
      </div>
    )
  }
}
