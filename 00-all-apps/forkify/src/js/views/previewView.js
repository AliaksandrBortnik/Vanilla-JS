import icons from 'url:../../img/icons.svg';
import {BaseView} from "./baseView";

export class PreviewView extends BaseView {
  constructor(parentElement) {
    super(
      parentElement,
      '',
      'No luck getting recipes!'
    );
  }

  _getTemplate() {
    return this._data.map(this._generatePreviewTemplate).join('');
  }

  _generatePreviewTemplate(recipe) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${recipe.id === id ? 'preview__link--active': ''}" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}