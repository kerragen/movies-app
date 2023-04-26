import { Component } from 'react'
import { format } from 'date-fns'
import { Skeleton, Rate } from 'antd'
import PropTypes from 'prop-types'
import './Movie.css'

export default class Movie extends Component {
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    poster: PropTypes.string,
    genresAll: PropTypes.array,
    genreIds: PropTypes.array,
    avgRate: PropTypes.number,
    guestSessionId: PropTypes.string,
    movieId: PropTypes.number,
    moviesServiceSession: PropTypes.object,
  }

  render() {
    const {
      title,
      date,
      description,
      poster,
      genresAll,
      genreIds,
      avgRate,
      guestSessionId,
      movieId,
      moviesServiceSession,
    } = this.props

    const urlImg = 'https://image.tmdb.org/t/p/original'

    const cutDescription = (string) => {
      if (string.length < 100) {
        return string
      }
      if (!string) {
        return 'No overview here, sorry'
      }
      return `${string.split('').slice(0, 100).join('')}...`
    }

    const onRated = (value) => {
      if (value === 0) {
        localStorage.removeItem(movieId)
        return moviesServiceSession.deleteRate(movieId, guestSessionId)
      } else {
        localStorage.setItem(movieId, value)
        return moviesServiceSession.postRate(movieId, guestSessionId, value)
      }
    }

    const filterGenres = genresAll.filter((genre) => genreIds.includes(genre.id))
    const genres = filterGenres.map((item) => {
      return (
        <span key={item.name} className="movie__genre">
          {item.name}
        </span>
      )
    })

    let borderColor = ''
    if (avgRate >= 0 && avgRate < 3) {
      borderColor = '#E90000'
    } else if (avgRate >= 3 && avgRate < 5) {
      borderColor = '#E97E00'
    } else if (avgRate >= 5 && avgRate < 7) {
      borderColor = '#E9D100'
    } else if (avgRate >= 7) {
      borderColor = '#66E900'
    }

    const starRate = Number(localStorage.getItem(movieId))

    return (
      <div className="movie">
        <div className="movie__img-content">
          {poster ? (
            <img className="movie__img" src={`${urlImg}${poster}`} alt="poster" />
          ) : (
            <Skeleton.Image style={{ width: '183px', height: '281px', borderRadius: '0' }} />
          )}
        </div>
        <div className="movie__content">
          <h1 className="movie__title">{title}</h1>
          <span className="movie__rating" style={{ borderColor }}>
            {avgRate.toFixed(1)}
          </span>
          <span className="movie__date">{date ? format(new Date(date), 'MMMM dd, yyyy') : 'No date'}</span>
          <div className="movie__genres">{genres}</div>
          <div className="movie__description">{cutDescription(description)}</div>
          <Rate className="movie__rate" defaultValue={starRate} onChange={onRated} count={10} />
        </div>
      </div>
    )
  }
}
