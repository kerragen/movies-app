export default class MoviesService {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Coult not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }
  _api = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=2415b18ea98f8c39a1989e0ae86bc2ea'

  async getMovies(query, page) {
    if (!query) {
      const popular = await this.getResource(
        `${this._api}/movie/popular?${this._apiKey}&language&language=en-US&page=${page}`
      )
      return popular
    }
    const res = await this.getResource(
      `${this._api}/search/movie?${this._apiKey}&language=en-US&query=${query}&page=${page}`
    )
    return res
  }

  async createGuestSession() {
    const guest = await this.getResource(`${this._api}/authentication/guest_session/new?${this._apiKey}`)
    return guest
  }

  async getGenre() {
    const genre = await this.getResource(`
    ${this._api}/genre/movie/list?${this._apiKey}&language=en-US`)
    return genre
  }

  async postRate(movieId, guestSessionId, value) {
    const rate = await fetch(
      `${this._api}/movie/${movieId}/rating?${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: value,
        }),
      }
    )
    return await rate.json()
  }

  async deleteRate(movieId, guestSessionId) {
    const delRate = await fetch(
      `${this._api}/movie/${movieId}/rating?${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    return await delRate.json()
  }

  async getRatedMovies(guestSessionId, page) {
    const rated = await this.getResource(
      `${this._api}/guest_session/${guestSessionId}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    )
    return rated
  }
}
