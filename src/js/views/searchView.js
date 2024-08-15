class SearchView {
  #parentElement = document.querySelector('.search');
  // SEARCH THE INPUT VALUE
  getResult() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clear();
    return query;
  }
  // CLEAR THE INPUT VALUES
  #clear() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  // BUTTON  SUBMIT THE VALUES
  addHandlerSearchResults(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
