import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let searchName;

const inputEl = document.querySelector('#search-box');
const conteiner = document.querySelector('.country-info');

function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  console.log(inputEl.value);

  searchName = inputEl.value.trim();
  fetchCountries(searchName)
    .then(data => {
      clearConteiner();
      console.log(data);
      createText(data);
    })
    .catch(error => {
      console.log(error);
      textError();
    });
}

function createText(data) {
  if (data.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length >= 2 && data.length <= 10) {
    const markup_l = textList(data);
    conteiner.insertAdjacentHTML('beforeend', markup_l);
  }
  if (data.length === 1) {
    const markup_i = textInfo(data);
    conteiner.insertAdjacentHTML('beforeend', markup_i);
  }
}

function textList(data) {
  return data
    .map(({ flags, name }) => {
      return `<li>
      <img
        src="${flags.svg}"
        alt="Macbook Air на сірому дерев'яному столі"
        width="20";
      />
      <p>${name}</p>
    </li>`;
    })
    .join('');
}

function textInfo(data) {
  return data
    .map(({ flags, name, languages, capital, population }) => {
      return `<div>
      <img
        src="${flags.svg}"
        alt="Macbook Air на сірому дерев'яному столі"
        width="20";
      />
      <p>${name}</p>
    </div>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${languages.map(language => language.name)}</p>
    `;
    })
    .join('');
}

function textError() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}

function clearConteiner() {
  conteiner.innerHTML = '';
}


