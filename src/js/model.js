
// import { stat } from "fs";
import { async } from "regenerator-runtime";
import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helper.js' 
export const state = {
 recipe: {},
 research: {
   query: '',
   page: 1,
   results: [],
   resultsPerPage: RESULT_PER_PAGE
 },
 bookmarks: []
}

export const loadRecipe = async function(id) {
 try{
   const data = await getJSON(`${API_URL}/${id}`);
   let { recipe } = data.data;
   state.recipe = {
     id: recipe.id,
     title: recipe.title,
     publisher: recipe.publisher,
     sourceUrl: recipe.source_url,
     image: recipe.image_url,
     servings: recipe.servings,
     cookingTime: recipe.cooking_time,
     ingredients: recipe.ingredients,
   }

   if(state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true
     else
   state.recipe.bookmarked = false;  
 } catch(err) {
   console.log(err)
  throw err}
}

export const loadSearchResults = async function(query) {
  try {
   const data = await getJSON(`${API_URL}?search=${query}`);
   console.log(data);

   state.research.results = data.data.recipes.map(rec => {
     return { id: rec.id,
              imageUrl: rec.image_url,
              publisher: rec.publisher,
              title: rec.title}
   })
   state.research.page = 1;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export const getSearchResultPage = function (page = state.research.page) {
  state.research.page = page;
  const start = (page - 1) * state.research.resultsPerPage;
  const end = page * state.research.resultsPerPage;
  // console.log(state.research.results.slice(start,end))
 return state.research.results.slice(start,end);
}

//

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //update the quantity
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
    //update the recipe
    state.recipe.servings = newServings;
  })
}

export const addBookmark = function(recipe) {
  //add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true
}

export const removeBookmark = function(id) {
  const index = state.bookmarks.find(bookmark => bookmark.id === id)
  state.bookmarks.splice(index, 1);

  //Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

}