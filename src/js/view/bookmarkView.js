import View from './view.js';
import PreviewView from './previewView.js'
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarkView extends View {
 _parentElement = document.querySelector('.bookmarks__list');
 _errorMessage = 'No bookmark yet.Find a nice recipe to fill :('

 _generatedMarkup() {
  return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
   
 }
 
}

export default new BookmarkView;