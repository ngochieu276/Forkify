import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
 _parentElement = document.querySelector('.results');
 _errorMessage = 'No recipe found for query! Please try again :('

 _generatedMarkup() {
  return this._data.map(this._generatedMarkupPreview).join('')
   
 }
 _generatedMarkupPreview(result) {
    return `
     <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src=${result.imageUrl} alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.publisher}</h4>
                <p class="preview__publisher">${result.title}</p>
              </div>
            </a>
          </li>
   `
 }
}

export default new ResultView;