'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/*
  The Geolocation API is accessed via a call to navigator.geolocation
  this will cause the user's browser to ask them for permission to access their location data.
  If they accept, then the browser will use the best available functionality on the device
  to access this information (for example, GPS).
 */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (geolocationPosition) {
      console.log('Just got your location', geolocationPosition);
      const {latitude, longitude} = geolocationPosition.coords;
      const coords = [latitude, longitude];
      const zoomLevel = 13;

      const map = L.map('map').setView(coords, zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.on('click', function(mapEvent) {
        console.log(mapEvent);
        const pinCoords = [mapEvent.latlng.lat, mapEvent.latlng.lng];

        L.marker(pinCoords)
          .addTo(map)
          .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false, // If open another popup, previous automatically closes
            closeOnClick: false,
            className: 'running-popup'
          }))
          .setPopupContent('Activity')
          .openPopup();
      });
    },
    function() {
      console.warn('No success in getting your geolocation');
    }
  );
}

