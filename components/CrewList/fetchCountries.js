export class fetchCountries {

  getCountries() {
      return fetch('./Nations.json').then(res => res.json())
          .then(d => d.data);
  }
}