class SearchView {
  #parentElement = document.querySelector('.search');
  #searchField = this.#parentElement.querySelector('.search__field');

  getQuery() {
    return this.#searchField.value;
  }

  clearInput() {
    this.#searchField.value = '';
  }

  addSearchHandler(handler) {
    this.#parentElement.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent from sending the form to action with a page reload
      handler();
    });
  }
}

export const searchView = new SearchView();