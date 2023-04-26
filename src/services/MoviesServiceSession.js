export default class MoviesServiceSession {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  _api = 'https://api.themoviedb.org/3'
  _apiKey = '2415b18ea98f8c39a1989e0ae86bc2ea'

  async createGuestSession() {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      return { guest_session_id: sessionId }
    }
    const apiUrl = new URL(`${this._api}/authentication/guest_session/new`)
    apiUrl.searchParams.append('api_key', this._apiKey)

    try {
      const guest = await this.getResource(apiUrl.toString())
      localStorage.setItem('sessionId', guest.guest_session_id)
      return guest
    } catch (err) {
      throw new Error(`Could not create guest session, ${err}`)
    }
  }

  async postRate(movieId, guestSessionId, value) {
    const apiUrl = new URL(`${this._api}/movie/${movieId}/rating`)
    apiUrl.searchParams.append('api_key', this._apiKey)
    apiUrl.searchParams.append('guest_session_id', guestSessionId)

    try {
      const rate = await fetch(apiUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: value,
        }),
      })
      if (!rate.ok) {
        throw new Error(`Could not post rate for movie ${movieId}, received ${rate.status}`)
      }
      return await rate.json()
    } catch (err) {
      throw new Error(`Could not post rate for movie ${movieId}, ${err}`)
    }
  }

  async deleteRate(movieId, guestSessionId) {
    const apiUrl = new URL(`${this._api}/movie/${movieId}/rating`)
    apiUrl.searchParams.append('api_key', this._apiKey)
    apiUrl.searchParams.append('guest_session_id', guestSessionId)

    try {
      const delRate = await fetch(apiUrl.toString(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      if (!delRate.ok) {
        throw new Error(`Could not delete rate for movie ${movieId}, received ${delRate.status}`)
      }
      return await delRate.json()
    } catch (err) {
      throw new Error(`Could not delete rate for movie ${movieId}, ${err}`)
    }
  }

  async getRatedMovies(guestSessionId, page) {
    const apiUrl = new URL(`${this._api}/guest_session/${guestSessionId}/rated/movies`)
    apiUrl.searchParams.append('api_key', this._apiKey)
    apiUrl.searchParams.append('language', 'en-US')
    apiUrl.searchParams.append('sort_by', 'created_at.asc')
    apiUrl.searchParams.append('page', page)

    try {
      const rated = await this.getResource(apiUrl.toString())
      return rated
    } catch (err) {
      throw new Error(`Could not get rated movies for session ${guestSessionId}, ${err}`)
    }
  }
}
