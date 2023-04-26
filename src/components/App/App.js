import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Tabs } from 'antd'

import { MoviesServiceProvider, MoviesServiceConsumer } from '../Movies-service-context/Movies-service-context'
import ErrorAlert from '../Errors/ErrorAlert'
import MoviesList from '../MoviesList/MoviesList'
import MoviesServiceData from '../../services/MoviesServiceData'
import MoviesServiceSession from '../../services/MoviesServiceSession'
import './App.css'

export default class App extends Component {
  moviesServiceData = new MoviesServiceData()
  moviesServiceSession = new MoviesServiceSession()

  state = {
    genres: [],
    guestSessionId: '',
  }

  componentDidMount() {
    this.moviesServiceSession.createGuestSession().then((response) => {
      this.setState({
        guestSessionId: response.guest_session_id,
      })
    })
    this.moviesServiceData.getGenre().then((response) => {
      this.setState({
        genres: response.genres,
      })
    })
  }

  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <MoviesServiceConsumer>
            {([, moviesServiceSession, guestSessionId]) => {
              return (
                <MoviesList
                  moviesServiceData={this.moviesServiceData}
                  moviesServiceSession={moviesServiceSession}
                  guestSessionId={guestSessionId}
                  name={items[0].label}
                />
              )
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
              return (
                <MoviesList
                  moviesServiceData={this.moviesServiceData}
                  moviesServiceSession={this.moviesServiceSession}
                  guestSessionId={guestSessionId}
                  name={items[1].label}
                />
              )
            }}
          </MoviesServiceConsumer>
        ),
      },
    ]

    return (
      <div className="main">
        <MoviesServiceProvider value={[this.state.genres, this.moviesServiceSession, this.state.guestSessionId]}>
          <Online>
            <Tabs
              defaultActiveKey="1"
              centered
              items={items}
              className="tabs"
              size="large"
              destroyInactiveTabPane="true"
            />
          </Online>
          <Offline>
            <ErrorAlert message="No internet" description="Connect to the internet" type="error" />
          </Offline>
        </MoviesServiceProvider>
      </div>
    )
  }
}
