
import 'core-js/stable'; // Polyfill for common ES6 stuff
import 'regenerator-runtime'; // Polyfill for async/await
import * as model from "./model";
import {recipeView} from "./views/recipeView";

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const showSpinner = function (parentElement) {
  const template = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', template);
};

const showRecipe = async function () {
  try {
    const recipeId = location.hash.slice(1);

    if (!recipeId) return;

    showSpinner(recipeContainer);
    // 1. Get data from API
    await model.loadRecipe(recipeId);
    const recipe = model.state.recipe;

    // 2. Prepare template to render
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, showRecipe));