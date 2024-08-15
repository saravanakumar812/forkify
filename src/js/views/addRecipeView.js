import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerOpen();
    this._addHandlerClose();
  }
  toggleButton() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerOpen() {
    this._btnOpen.addEventListener('click', this.toggleButton.bind(this));
  }
  _addHandlerClose() {
    this._btnClose.addEventListener('click', this.toggleButton.bind(this));
    this._overlay.addEventListener('click', this.toggleButton.bind(this));
  }
  addNewRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generatedMarkUp() {}
}

export default new AddRecipeView();
