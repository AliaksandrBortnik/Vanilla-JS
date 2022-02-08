import 'core-js/stable'; // Polyfill for common ES6 stuff
import 'regenerator-runtime'; // Polyfill for async/await
import * as model from "./model";
import {recipeView} from "./views/recipeView";

const controlRecipes = async function () {
  try {
    const recipeId = location.hash.slice(1);
    if (!recipeId) return;

    recipeView.showSpinner();
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, controlRecipes));
