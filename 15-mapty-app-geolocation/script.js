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

class App {
  workouts = [];
  #map;
  #lastMapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleActivityField);
  }

  _getPosition() {
    /*
      The Geolocation API is accessed via a call to navigator.geolocation
      this will cause the user's browser to ask them for permission to access their location data.
      If they accept, then the browser will use the best available functionality on the device
      to access this information (for example, GPS).
    */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => this._loadMap(geoPosition.coords),
        () => console.warn('No success in getting your geolocation')
      );
    }
  }

  _loadMap({latitude, longitude}) {
    const coords = [latitude, longitude];
    const zoomLevel = 13;

    this.#map = L.map('map').setView(coords, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#lastMapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleActivityField(e) {
    if (!e.target.value) return;
    // Switch between cycling and running type of activity.
    inputCadence.parentElement.classList.toggle('form__row--hidden');
    inputElevation.parentElement.classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    clearForm();

    const workout = {}; // TODO: implement
    this.workouts.push(workout);

    // Show marker
    const coords = this.#lastMapEvent.latlng;
    const pinCoords = [coords.lat, coords.lng];

    L.marker(pinCoords)
      .addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false, // If open another popup, previous automatically closes
        closeOnClick: false,
        className: 'running-popup'
      }))
      .setPopupContent('Activity')
      .openPopup();
  }
}

class Workout {
  _id; // TODO: generate

  constructor(distance, duration, coords) {
    this._id = 'uniqueId';
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence, pace) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.pace = pace;
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain, speed) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.speed = speed;
  }
}

function clearForm() {
  inputType.value = '';
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
}

const app = new App();