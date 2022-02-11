import {API_URL, SEARCH_RESULT_PAGE_SIZE} from "./config";
import {getJson} from "./helpers";

export const state = {
  recipe: {},
  search: {
    results: [],
    resultsPerPage: SEARCH_RESULT_PAGE_SIZE,
    page: 1,
    query: ''
  }
};

export const loadRecipe = async (recipeId) => {
  try {
    const data = await getJson(`${API_URL}/recipes/${recipeId}`);
    const { recipe: recipePayload } = data.data;

    state.recipe = {
      id: recipePayload.id,
      title: recipePayload.title,
      publisher: recipePayload.publisher,
      sourceUrl: recipePayload.source_url,
      imageUrl: recipePayload.image_url,
      ingredients: recipePayload.ingredients,
      cookingTime: recipePayload.cooking_time,
      servings: recipePayload.servings
    };

    console.log('Received recipe data', state.recipe);
  } catch (err) {
    console.error(err);
  }
};

export const loadSearchResults = async (query) => {
  try {
    const data = await getJson(`${API_URL}/recipes?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      imageUrl: recipe.image_url
    }));
  } catch (err) {
    console.error('Error happened in loadSearchResults');
  }
};

export const getSearchResultByPage = (page = state.search.page) => {
  state.search.page = page;
  const pageSize = state.search.resultsPerPage;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return state.search.results.slice(startIndex, endIndex);
};

export const updateServings = (targetServings) => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * targetServings / state.recipe.servings;
  });

  state.recipe.servings = targetServings;
};