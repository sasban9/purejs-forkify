import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//console.log('SASBAN!');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
    // recipeView.renderError(`${err} 💥💥💥`);
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if(!query) return; 

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();