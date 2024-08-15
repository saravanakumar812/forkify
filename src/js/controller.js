// ICONS
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookMarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_UPLOAD_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// console.log(icons);

// const recipeContainer = document.querySelector('.recipe');

const controllerRecipe = async function () {
  // LOADING APIS
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // LOADING IMAGE
    recipeView.renderSpinner();

    resultsView.update(model.getResultPerPage());

    // LOADING RECIPE
    await model.loadingRender(id);
    // RENDERING RECIPE

    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlResults = async function () {
  try {
    resultsView.renderSpinner();
    // SEARCH RESULTS
    const query = searchView.getResult();
    // console.log(query);

    if (!query) return resultsView.renderError();
    // LOADING RESULTS
    await model.loadSearchResults(query);

    // console.log(model.state.search.results);

    resultsView.render(model.getResultPerPage());
    // PAGINATION ON THE PER PAGE

    paginationView.render(model.state.search);

    // console.log();
  } catch (err) {
    console.log(err);
  }
};

const paginationControl = async function (goToPage) {
  try {
    resultsView.render(model.getResultPerPage(goToPage));
    // PAGINATION ON THE PER PAGE
    paginationView.render(model.state.search);
  } catch (error) {}
};
const controlServings = async function (newServings) {
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = async function () {
  if (!model.state.recipe.bookmarked) model.addBookMarks(model.state.recipe);
  else model.deleteBookMarks(model.state.recipe.id);

  console.log(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};
// paginationControl();
const controlBookMarks = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // render spinner
    addRecipeView.renderSpinner();
    // upload recipe
    await model.uploadRecipe(newRecipe);
    // update recipe
    recipeView.render(model.state.recipe);
    // success message

    addRecipeView.renderMessage();

    // add book mark
    bookmarkView.render(model.state.bookmarks);

    //update id
    window.history.pushState(null, ' ', `#${model.state.recipe.id}`);

    // timeout
    setTimeout(() => {
      addRecipeView.toggleButton();
    }, MODAL_UPLOAD_CLOSE_SEC * 1000);

    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }

  // console.log(newRecipe);
};
const init = function () {
  bookmarkView.addHandlerBookMarks(controlBookMarks);
  recipeView.addHandlerRender(controllerRecipe);
  recipeView.addHandlerClick(controlServings);
  recipeView.addHandlerBookMark(controlAddBookMark);
  searchView.addHandlerSearchResults(controlResults);
  paginationView.addHandlerClick(paginationControl);
  addRecipeView.addNewRecipe(controlAddRecipe);
};
init();
