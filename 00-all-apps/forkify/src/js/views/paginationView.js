import icons from 'url:../../img/icons.svg';
import {BaseView} from "./baseView";

class PaginationView extends BaseView {
  constructor() {
    const parentElement = document.querySelector('.pagination');
    super(parentElement);
  }

  addClickHandler(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _getTemplate() {
    const pageCount = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    if (this._data.page === 1 && pageCount > 1) {
      return `
        <button data-goto="2" class="btn--inline pagination__btn--next">
          <span>Page 2</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    if (this._data.page === pageCount && pageCount > 1) {
      return `
        <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>
      `;
    }

    if (pageCount > 1) {
      return `
        <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // There is only one page with results
    return '';
  }
}

export const paginationView = new PaginationView();