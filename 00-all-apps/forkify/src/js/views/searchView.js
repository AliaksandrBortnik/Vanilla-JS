import {BaseView} from "./baseView";

class SearchView extends BaseView {
  _searchField = this._parentElement.querySelector('.search__field');

  constructor() {
    const parentElement = document.querySelector('.search');
    super(
      parentElement
    );
  }

  getQuery() {
    return this._searchField.value;
  }

  clearInput() {
    this._searchField.value = '';
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent from sending the form to action with a page reload
      handler();
    });
  }
}

export const searchView = new SearchView();