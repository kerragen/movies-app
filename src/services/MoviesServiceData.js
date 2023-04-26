export default class MoviesServiceData {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  _api = 'https://api.themoviedb.org/3'
  _apiKey = '2415b18ea98f8c39a1989e0ae86bc2ea'

  async getMovies(query, page) {
    try {
      if (!query) {
        const apiUrl = new URL(`${this._api}/movie/popular`)
        apiUrl.searchParams.append('api_key', this._apiKey)
        apiUrl.searchParams.append('language', 'en-US')
        apiUrl.searchParams.append('page', page)

        const popular = await this.getResource(apiUrl.toString())
        return popular
      }
      const apiUrl = new URL(`${this._api}/search/movie`)
      apiUrl.searchParams.append('api_key', this._apiKey)
      apiUrl.searchParams.append('language', 'en-US')
      apiUrl.searchParams.append('query', query)
      apiUrl.searchParams.append('page', page)

      const res = await this.getResource(apiUrl.toString())
      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async getGenre() {
    try {
      const apiUrl = new URL(`${this._api}/genre/movie/list`)
      apiUrl.searchParams.append('api_key', this._apiKey)
      apiUrl.searchParams.append('language', 'en-US')

      const res = await this.getResource(apiUrl.toString())
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}
