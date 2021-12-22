
export class CountryService {

  getCountries() {
    return (
      fetch('./Countries.json')
        .then(res => res.json())
        .then(d => d.data)
    )

  }
}
