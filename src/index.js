import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let searchName;
const inputEl = document.querySelector('#search-box');
const conteiner = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  searchName = inputEl.value.trim();
  console.log(searchName);
  fetchCountries(searchName)
    .then(data => {
      clearConteiner();
      console.log(data);
      createText(data);
    })
    .catch(error => {
      console.log(error);
      clearConteiner();
      if (searchName !== '') {
        textError();
      }
    });
}
removeListener();

function removeListener() {
  if (inputEl.value === '') {
    inputEl.removeEventListener('input', onInputCountry);
  }
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
      return `<li class = "box">
      <img
        src="${flags.svg}"
        alt="Macbook Air на сірому дерев'яному столі"
        width="20";
      />
      <p class = "country">${name}</p>
    </li>`;
    })
    .join('');
}

function textInfo(data) {
  return data
    .map(({ flags, name, languages, capital, population }) => {
      return `<div class = "box">
      <img
        src="${flags.svg}"
        alt="Macbook Air на сірому дерев'яному столі"
        width="20";
      />
      <p class = "country">${name}</p>
    </div>
    <p class="text_bold">Capital: <span>${capital}</span></p>
    <p class="text_bold">Population: <span>${population}</span></p>
    <p class="text_bold">Languages: <span>${languages.map(language => language.name)}</span></p>
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
