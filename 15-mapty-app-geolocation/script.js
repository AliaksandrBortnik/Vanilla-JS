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
    const validInputs = (...inputs) => inputs.every(Number.isFinite);
    const allPositive = (...inputs) => inputs.every(i => i > 0);

    e.preventDefault();

    const coords = this.#lastMapEvent.latlng;
    const pinCoords = [coords.lat, coords.lng];

    const activityType = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);

    // Validation
    if (!activityType) {
      alert('Type of activity is required');
      return;
    }

    let workout;

    if (activityType === 'running') {
      const cadence = Number(inputCadence.value);

      if (!validInputs(distance, duration, cadence) ||
          !allPositive(distance, duration, cadence)) {
        alert('Values must be positive numbers.')
        return;
      }

      workout = new Running(distance, duration, pinCoords, cadence);
    }

    if (activityType === 'cycling') {
      const elevation = Number(inputElevation.value);

      if (!validInputs(distance, duration, elevation) ||
          !allPositive(distance, duration)) {
        alert('Values must be positive numbers.')
        return;
      }

      workout = new Cycling(distance, duration, pinCoords, elevation);
    }

    this.workouts.push(workout);
    this._displayWorkoutPin(workout, activityType);
    this._clearForm();
  }

  _displayWorkoutPin(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false, // If open another popup, previous automatically closes
        closeOnClick: false,
        className: `${workout.type}-popup`
      }))
      .setPopupContent('Activity') // TODO: fill content in pop-up
      .openPopup();
  }

  _clearForm() {
    inputType.value = '';
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
  }
}

class Workout {
  id = uuidv4();
  date = new Date();

  constructor(distance, duration, coords) {
    this.distance = distance; // km
    this.duration = duration; // min
    this.coords = coords;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
  }

  get pace() {
    return this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
  }

  get speed() {
    return this.distance / this.duration;
  }
}

const app = new App();