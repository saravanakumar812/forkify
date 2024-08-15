import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'BookMark not yet, No data Found!';

  addHandlerBookMarks(handler) {
    window.addEventListener('load', handler);
  }
  _generatedMarkUp() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
