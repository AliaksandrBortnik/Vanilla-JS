import {API_URL} from "./config";
import {getJson} from "./helpers";

export const state = {
  recipe: {}
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