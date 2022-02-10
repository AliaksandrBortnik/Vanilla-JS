import 'core-js/stable'; // Polyfill for common ES6 stuff
import 'regenerator-runtime'; // Polyfill for async/await
import * as model from "./model";
import {recipeView} from "./views/recipeView";
import {searchView} from "./views/searchView";
import {resultView} from "./views/resultView";
import {state} from "./model";

// HRM for Parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const recipeId = location.hash.slice(1);
    if (!recipeId) return;

    recipeView.showSpinner();
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError('No recipes found for your query. Please try again!');
  }
};

const controlSearchResults = async () => {
  try {
    resultView.showSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    searchView.clearInput();
    resultView.render(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  recipeView.addRenderHandler(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
};

init();
