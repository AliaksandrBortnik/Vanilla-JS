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

// btn.addEventListener('click', () => getCountryAndNeighbour('united kingdom'));

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

const getJson = (url, message = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${message}. Status is ${response.status}`);
    }
    return response.json();
  });
}

// 2. Same as previous, but using a modern fetch API instead of old XMLHttpRequest
const getCountryAndNeighbour = (name) => {
  getJson(`https://restcountries.com/v2/name/${name}`, 'Country data is not received')
    // It is possible to pass two callbacks: for resolved and rejected promises
    // .then(resp => resp.json(), err => alert(err))
    .then(resp => {
      const [country] = resp;
      const [neighbour] = country.borders;
      renderCountry(country);

      if (!neighbour) throw new Error('Neighbour of the country is not found');

      return getJson(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country data is not received');
    })
    .then(neighborCountry => renderCountry(neighborCountry, 'neighbour'))
    .catch(err => renderError(err.message)) // more universal error handler
    .finally(_ => {
      countriesContainer.style.opacity = 1;
      // Usually for stopping spinner/loader
    });
};

// getCountryAndNeighbour('portugal');

// 3. Promises (Pending -> Settled (Fulfilled / Rejected))
// Callstack, event loop, macrotask queue, microtask queue, web apis environment
console.log('Starting');
setTimeout(() => console.log('Timer'), 0); // task queue / macrotask queue / callback queue
Promise.resolve('Resolved 1').then(res => console.log(res)); // microtask queue
Promise.resolve('Resolved 2').then(res => {
  //for (let i = 0; i < 10000000000; i++) {} // simulate long running microtask to delay the callback of timer macrotask
  console.log(res)
}); // microtask queue
console.log('End');

// 4. Building own promises from scratch
const lottery = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve('Victory');
  } else {
    reject('No luck');
  }
});

lottery
  .then(console.log)
  .then(null, console.warn) // similar to catch. rarely used
  .catch(console.error) // most common approach to handle rejected promise in a promise chain

// 5. Promisifying (convert callback based async behavior to promise based)
const wait = (seconds) => {
  return new Promise(resolve => {
    setTimeout(_ => resolve(`Waited ${seconds} seconds`), seconds * 1000);
  });
}

// Leverage a promise chain approach instead of callback hell (see #0 at the beginning of the script)
// Flat code structure is much better than deeply nested
wait(1)
  .then(res => {
    console.log(res);
    return wait(2);
  })
  .then(res => {
    console.log(res);
    return wait(3);
  })
  .then(res => {
    console.log(res);
    return wait(4);
  })
  .then(res => {
    console.log(res);
  });

// There is even better approach using async/await feature to access siblings data and keep flattest structure possible
const waitAll = async () => {
  console.log(await wait(1));
  console.log(await wait(2));
  console.log(await wait(3));
  console.log(await wait(4));
};

waitAll();

// 6. Static methods
Promise.resolve('Resolved state').then(console.log);
Promise.reject('Rejected state').catch(console.error);

// 7. Promisifying geolocation API call
const getPosition = () => {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

///////////////////////////////////////
// Coding Challenge #1

// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates).
// const whereAmI = function (lat, lng) {
const whereAmI = function () { // Version 2. Using promisified GeoLocation call to get position
  getPosition()
    .then(({ latitude: lat, longitude: lng}) => {
      // 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name.
      return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    })
    .then(resp => {
      if (!resp.ok) throw new Error('Geolocation service issue');
      return resp.json();
    })
    .then(data => {
      const {city, countryName} = data;
      // 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
      console.log(`You are in ${city}, ${countryName}`);
      return countryName;
    })
    .then(countryName => {
      // 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
      return fetch(`https://restcountries.com/v2/name/${countryName}`);
    })
    .then(resp => {
      if (!resp.ok) throw new Error('Restcountries service issue');
      return resp.json();
    })
    // 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
    .then(([country]) => renderCountry(country))
    // 4. Chain a .catch method to the end of the promise chain and log errors to the console
    .catch(err => console.error('Something went wrong', err))
    .finally(_ => {
      // Hide loader or whatever
    });
}

btn.addEventListener('click', whereAmI);

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////

// Coding Challenge #2
/*
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

// 1. Create a function 'createImage' which receives imgPath as an input.
// This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute
// to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and
// resolve the promise. The fulfilled value should be the image element itself.
// In case there is an error loading the image ('error' event), reject the promise.
const imgContainer = document.querySelector('.images');

const createImage = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('error', reject);
    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });
  });
};

// let lastLoadedImg;
//
// createImage('./img/img-1.jpg')
//   // 2. Comsume the promise using .then and also add an error handler;
//   // 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
//   .then(img => {
//     lastLoadedImg = img;
//     return wait(2);
//   })
//   // 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image
//   .then(_ => {
//     lastLoadedImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   // 5. After the second image has loaded, pause execution for 2 seconds again;
//   .then(img => {
//     lastLoadedImg = img;
//     return wait(2);
//   })
//   // 6. After the 2 seconds have passed, hide the current image.
//   .then(_ => {
//     lastLoadedImg.style.display = 'none';
//   })
//   .catch(console.error);

// Rewrite using async/await syntax
const renderImage = async (imgPath) => {
  const img = await createImage(imgPath);
  await wait(2);
  img.style.display = 'none';
}

const showImages = async () => {
  try {
    await renderImage('./img/img-5.jpg');
    await renderImage('./img/img-2.jpg');
  } catch (e) {
    console.error(e);
  }
};

showImages();









