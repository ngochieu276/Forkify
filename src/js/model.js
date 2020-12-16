
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
 }
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