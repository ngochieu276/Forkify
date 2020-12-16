const { async } = require("q");
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

 const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////
`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`

 if (module.hot) {
   module.hot.accept(); 
 }
const controlRecipe = async function() {
  try {
     const id = window.location.hash.slice(1);
   if (!id) return;
   recipeView.renderSpinner()
   
    // 1) loading recipe
   await model.loadRecipe(id);
    /// 2) rendering recipe
   recipeView.render(model.state.recipe);
   console.log(recipeView)
  } catch(err) {
    recipeView.renderError()
  }
};

const controlSearchResults = async function() {
  try {
   resultsView.renderSpinner();
   console.log(resultsView)
    // 1) get query
   const query = searchView.getQuery();
   if(!query) return;
   // 2) get data
   await model.loadSearchResults(query);
   // 3) render;
   resultsView.render(model.getSearchResultPage())
   //4 render pagination
   paginationView.render(model.state.research)
  } catch(err) {
    console.log(err)
  }
}

const controlPagination = function(goToPage) {
 // 3) render new result
   resultsView.render(model.getSearchResultPage(goToPage))
   //4 render pagination
   paginationView.render(model.state.research)
}

//
const controlServings = function(newServings) {
  //update the recipe state
   model.updateServings(newServings);
  // render the recipe
   recipeView.render(model.state.recipe)
}

function init() {
recipeView.addHandleRender(controlRecipe);
searchView.addHandleSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
recipeView.addHandlerUpdateServings(controlServings);
}
init()
