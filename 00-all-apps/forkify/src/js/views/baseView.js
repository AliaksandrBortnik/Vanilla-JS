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

  update(data) {
    this._data = data;
    const template = this._getTemplate(this._data);

    const newDOM = document.createRange().createContextualFragment(template);
    const newElements = [...newDOM.querySelectorAll('*')];
    const currentElements = [...this._parentElement.querySelectorAll('*')];

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];

      // Sync changed text
      if (!newEl.isEqualNode(currentEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        currentEl.textContent = newEl.textContent;
      }

      // Sync changed attributes
      if (!newEl.isEqualNode(currentEl)) {
        [...newEl.attributes].forEach(attribute => {
          currentEl.setAttribute(attribute.name, attribute.value);
        })
      }
    });
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