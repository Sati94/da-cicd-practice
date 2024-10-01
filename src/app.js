import { getRecipes } from "./recipes.js";


function element(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const eventName = key.toLowerCase().substring(2)
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  })

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child);
    }
  })
  return element;
}
function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.className = "card mb-3 col-md-4'";
  card.style = 'max-width: 300px';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  cardTitle.textContent = recipe.name;

  const ingredientList = document.createElement('ul');
  ingredientList.className = 'list-group list-group-flush';

  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('il');
    listItem.className = 'list-group-item';
    listItem.textContent = `${ingredient.quantity} ${ingredient.item}`;
    ingredientList.appendChild(listItem);
  });

  const instructionsTitle = document.createElement('h6');
  instructionsTitle.className = 'mt-3';
  instructionsTitle.textContent = 'Instructions:';

  const instructionsList = document.createElement('ol');
  recipe.instructions.forEach(instruction => {
    const listItem = document.createElement('li');
    listItem.textContent = instruction;
    instructionsList.appendChild(listItem);
  });


  cardBody.appendChild(cardTitle);
  cardBody.appendChild(ingredientList);
  cardBody.appendChild(instructionsTitle);
  cardBody.appendChild(instructionsList);
  card.appendChild(cardBody);

  return card;
}

function createContainer({ onShow }) {
  const container = element('div', { class: 'container' }, [
    element('h1', {}, ['My Recipes']),
    element('button', { class: 'btn btn-primary', onClick: onShow }, ['Show Recipes']),
    element('div', { id: 'recipeList', class: 'rows' }),
  ])
  return container;
}

export function setupApp(root) {

  let isVisible = false;

  function handleShow(event) {
    isVisible = !isVisible;
    const list = event.target.parentNode.querySelector('#recipeList');


    if (isVisible) {
      const heading = document.createElement('h2');
      heading.textContent = 'Recipe List';
      list.appendChild(heading);

      const recipes = getRecipes();
      recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        list.appendChild(recipeCard);
      })
    }
  }

  root.appendChild(createContainer({ onShow: handleShow }))
  return root;
}
