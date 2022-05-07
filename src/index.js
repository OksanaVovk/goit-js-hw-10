import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let searchName;

const inputEl = document.querySelector('#search-box');

function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}`;
  console.log(url);
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// fetchCountries()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  console.log(inputEl.value);

  searchName = inputEl.value;
  fetchCountries(searchName)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}
