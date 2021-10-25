export default class CountryApiService {
  constructor() {
    this.base_url = `https://restcountries.com/v2/name/`;
    this.searchQuery = '';
    this.data = [];
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  fetchCountry() {
    const url = `${this.base_url}${this.searchQuery}`;

    return fetch(url)
      .then(response => response.json())
      .then(dataArr => {
        this.data = dataArr;
        return dataArr;
      });
  }

  resetQueryData() {
    this.query = '';
    this.data = '';
  }
}
