export const state = {
  recipe: {}
};

export const loadRecipe = async (recipeId) => {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(`No luck getting data. ${data.message}. ${data.status}`);

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