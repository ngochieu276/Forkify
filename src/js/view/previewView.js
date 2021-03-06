import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generatedMarkup(result) {
    const id = window.location.hash.slice(1);

    return `
     <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }"  href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.publisher}</h4>
                <p class="preview__publisher">${this._data.title}</p>
              </div>
              <div class="recipe__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
               <svg>
                <use href="${icons}#icon-user"></use>
               </svg>
              </div>
            </a>
          </li>
   `;
  }
}

export default new PreviewView();
