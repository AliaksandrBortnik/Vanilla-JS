import 'core-js/stable'; // Polyfill for common ES6 stuff
import 'regenerator-runtime'; // Polyfill for async/await
import * as model from "./model";
import {recipeView} from "./views/recipeView";
import {searchView} from "./views/searchView";
import resultView from "./views/resultView";
import {getSearchResultByPage, state} from "./model";
import {paginationView} from "./views/paginationView";
import bookmarkView from "./views/bookmarkView";

// HRM for Parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const recipeId = location.hash.slice(1);
    if (!recipeId) return;

    recipeView.showSpinner();
    resultView.update(model.getSearchResultByPage());
    bookmarkView.update(model.state.bookmarks);

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
    resultView.render(getSearchResultByPage());
    paginationView.render(state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = (gotoPage) => {
  resultView.render(getSearchResultByPage(gotoPage));
  paginationView.render(state.search);
};

const controlServings = (incrementServing) => {
  const updatedServings = model.state.recipe.servings + incrementServing;
  model.updateServings(updatedServings);
  recipeView.update(model.state.recipe); // recipeView.render(state.recipe);
};

const controlAddBookmarks = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const init = () => {
  recipeView.addRenderHandler(controlRecipes);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmarks);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
};

init();
