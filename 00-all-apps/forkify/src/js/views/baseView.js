import icons from 'url:../../img/icons.svg';

export class BaseView {
  _parentElement;
  _data;
  _message;
  _errorMessage;

  constructor(parentElement, message, errorMessage) {
    this._parentElement = parentElement;
    this._message = message || '';
    this._errorMessage = errorMessage || 'Something went wrong. Please, try again';
  }

  render(data) {
    if (!data || Array.isArray(data) && !data.length) return this.renderError();

    this._data = data;
    const template = this._getTemplate(this._data);
    this._clearView();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }

  renderMessage(message = this._message) {
    const template = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clearView();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }

  renderError(message = this._errorMessage) {
    const template = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clearView();
    this._parentElement.insertAdjacentHTML('beforeend', template);
  }

  showSpinner() {
    const template = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearView();
    this._parentElement.insertAdjacentHTML('afterbegin', template);
  };

  _clearView() {
    this._parentElement.innerHTML = '';
  }
}