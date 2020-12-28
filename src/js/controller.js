const { async } = require('q');
import * as model from './model.js';
import { MODEL_CLOSE } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarkView from './view/bookmarkView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////
`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`;

if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0)
    resultsView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);
    // 1) loading recipe
    await model.loadRecipe(id);
    /// 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    // 1) get query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) get data
    await model.loadSearchResults(query);
    // 3) render;
    resultsView.render(model.getSearchResultPage());
    //4 render pagination
    paginationView.render(model.state.research);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) render new result
  resultsView.render(model.getSearchResultPage(goToPage));
  //4 render pagination
  paginationView.render(model.state.research);
};

//
const controlServings = function (newServings) {
  //update the recipe state
  model.updateServings(newServings);
  // render the recipe
  //  recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  //2 Update recipe view
  recipeView.update(model.state.recipe);
  //3 Render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();
    //UPload the new recipe
    await model.uploadRecipe(newRecipe);
    //Render recipe
    recipeView.render(model.state.recipe);
    //Render bookmark view
    bookmarkView.render(model.state.bookmarks);
    //Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close window form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

function init() {
  bookmarkView.addHanlerRender(controlBookmark);
  recipeView.addHandleRender(controlRecipe);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
