'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const MAP_ZOOM_LEVEL = 13;

class App {
  workouts = [];
  #map;
  #mapZoomLevel = 13;
  #lastMapEvent;

  constructor() {
    this._getPosition();
    containerWorkouts.addEventListener('click', this._centerActivityOnMap.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

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
    this._renderWorkout(workout);
    this._renderWorkoutPin(workout, activityType);
    this._clearForm();
  }

  _renderWorkoutPin(workout) {
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

  _renderWorkout(workout) {
    const template =
      `<li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴' }️</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${ workout.type === 'running' ? workout.pace.toFixed() : workout.speed }</span>
          <span class="workout__unit">${ workout.type === 'running' ? 'min/km' : 'km/h' }</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${ workout.type === 'running' ? '🦶' : '⛰' }</span>
          <span class="workout__value">${ workout.type === 'running' ? workout.cadence.toFixed() : workout.elevationGain }</span>
          <span class="workout__unit">${ workout.type === 'running' ? 'spm' : 'm' }</span>
        </div>
      </li>`;

    form.insertAdjacentHTML('afterend', template);
  }

  _clearForm() {
    form.style.display = 'none'; // TODO: remove when animation is finished
    form.classList.add('hidden');
    setTimeout(() => form.style.display = 'grid', 1000); // TODO: remove when animation is finished

    inputType.value = '';
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
  }

  _centerActivityOnMap(e) {
    const targetWorkout = e.target.closest('.workout');

    if (!targetWorkout) return;

    const id = targetWorkout.dataset.id;
    const workout = this.workouts.find(w => w.id === id);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true, // optional options
      pan: {
        duration: 1
      }
    });
  }
}

class Workout {
  id = uuidv4();
  date = new Date();
  type;

  constructor(distance, duration, coords) {
    this.distance = distance; // km
    this.duration = duration; // min
    this.coords = coords;
  }

  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${this.date.toLocaleDateString()}`;
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.type = 'running';
    this.cadence = cadence;
    this._setDescription();
  }

  get pace() {
    return this.duration / this.distance;
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.type = 'cycling';
    this.elevationGain = elevationGain;
    this._setDescription();
  }

  get speed() {
    return this.distance / this.duration;
  }
}

const app = new App();