'use strict';

// 0. Classic deeply nested asynchronous stuff. In other words, callback hell
setTimeout(() => {
  console.log('First timeout logic');
  setTimeout(() => {
    console.log('Second timeout logic');
    setTimeout(() => {
      console.log('Third timeout logic');
      setTimeout(() => {
        console.log('Fourth timeout logic');
      }, 1000);
    }, 1000)
  }, 1000);
}, 1000);

///////////////////////////////////////

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

btn.addEventListener('click', () => getCountryAndNeighbour('united kingdom'));

const renderCountry = function (data, className = '') {
  const template = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1e6).toFixed(1)}M</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', template);
  countriesContainer.style.opacity = 1;
}

const renderError = (message) => {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
}

// 1. Leverage REST Countries API and using old-school XMLHttpRequest
// const getCountryAndNeighbour = function (name) {
//   const onLoad = function () {
//     const [payload] = JSON.parse(this.responseText);
//     const [neighbor] = payload.borders;
//     renderCountry(payload);
//
//     if (!neighbor) return; // Make sure there is a neighbour country
//
//     // Get neighbor data
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const neighborPayload = JSON.parse(this.responseText);
//       renderCountry(neighborPayload, 'neighbour');
//     });
//   };
//
//   const request = new XMLHttpRequest();
//   request.addEventListener('load', onLoad);
//   request.open('GET', `https://restcountries.com/v2/name/${name}`);
//   request.send();
// };
//
// getCountryAndNeighbour('united kingdom');

// 2. Same as previous, but using a modern fetch API instead of old XMLHttpRequest
const getCountryAndNeighbour = (name) => {
  fetch(`https://restcountries.com/v2/name/${name}`)
    .then(resp => resp.json())
    // It is possible to pass two callbacks: for resolved and rejected promises
    // .then(resp => resp.json(), err => alert(err))
    .then(resp => {
      const [country] = resp;
      const [neighbour] = country.borders;
      renderCountry(country);

      if (!neighbour) return; // Make sure there is a neighbour country

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(resp => resp.json())
    .then(neighborCountry => renderCountry(neighborCountry, 'neighbour'))
    .catch(err => renderError(err.message)) // more universal error handler
    .finally(_ => {
      countriesContainer.style.opacity = 1;
      // Usually for stopping spinner/loader
      console.log('Finished execution');
    });
};

// 3. Promises (Pending -> Settled (Fulfilled / Rejected))