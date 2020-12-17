import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultView extends View {
 _parentElement = document.querySelector('.results');
 _errorMessage = 'No recipe found for query! Please try again :('

 _generatedMarkup() {
  return this._data.map(results => previewView.render(results, false)).join('')
   
 }
}

export default new ResultView;