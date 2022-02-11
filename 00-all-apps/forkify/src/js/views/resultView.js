import icons from 'url:../../img/icons.svg';
import {BaseView} from "./baseView";

class ResultView extends BaseView {
  constructor() {
    const parentElement = document.querySelector('.results');
    super(
      parentElement,
      '',
      'No luck getting recipes!'
    );
  }

  _getTemplate() {
    return this._data.map(this._generateRecipeViewTemplate).join('');
  }

  _generateRecipeViewTemplate(recipe) {
    // TODO: add class on selected recipe. preview__link--active
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
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

export const resultView = new ResultView();