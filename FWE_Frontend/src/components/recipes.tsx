import React, { useEffect, useState } from "react";
import { Recipe, Ingredient } from "./../model";
import * as model from "./../model";
import Modal from "react-modal";
import { AJAX } from "../helpers";
import { API_URL } from "../config";

const RecipeDetails: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div className="recipe_details">
      <h2 className="heading--2">Recipe Description</h2>
      <h2>{description}</h2>
    </div>
  );
};
const RecipeDirections: React.FC<{ cookingSteps: string[] }> = ({
  cookingSteps,
}) => {
  return (
    <div className="recipe_directions">
      <h2 className="heading--2">Cooking Steps</h2>
      {cookingSteps.map((step, index) => (
        <h2 key={index}>{step}</h2>
      ))}
    </div>
  );
};
const RecipeIngredients: React.FC<{ ingredients: Ingredient[] }> = ({
  ingredients,
}) => {
  return (
    <div className="recipe_ingredients">
      <h2 className="heading--2">Recipe ingredients</h2>
      <ul className="recipe_ingredient-list">
        {ingredients.map((ing) => (
          <RecipeIngredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
const RecipeIngredient: React.FC<{ ingredient: Ingredient }> = ({
  ingredient,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeData, setRecipe] = useState<Recipe[]>([]);

  const handleButtonClick = async () => {
    setIsModalOpen(true);
    const recipes = await findRecipes();
    setRecipe(recipes);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const findRecipes = async () => {
    try {
      const response = await AJAX(
        `${API_URL}recipes?ingredients=${ingredient.id}`
      );

      if (response.status !== "success") {
        throw new Error("Failed to fetch recipe data");
      }
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <li className="recipe_ingredient">
      <div className="ingredient_icon">{ingredient.name}</div>
      <button
        className="ingredient_image"
        style={{ backgroundImage: `url('${ingredient.pictureLink}')` }}
        onClick={handleButtonClick}
      ></button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Ingredient Details"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",

            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div>
          {recipeData.length > 0 ? (
            recipeData.map((recipe) => (
              <div key={recipe.id}>
                <h2>{recipe.name}</h2>
              </div>
            ))
          ) : (
            <p>No recipes found for {ingredient.name}</p>
          )}
        </div>
      </Modal>
    </li>
  );
};
const RecipeView: React.FC<{ recipe: Recipe | null; updateResult: any }> = ({
  recipe: initialRecipe,
  updateResult,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(initialRecipe);

  useEffect(() => {
    const handleHashChange = async () => {
      await renderRecipe();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderRecipe = async () => {
    try {
      // Load the recipe data
      const id = window.location.hash.slice(1);
      await model.loadRecipe(id);
      const loadedRecipe: Recipe = model.state.recipe;
      setRecipe(loadedRecipe);
    } catch (err) {
      console.error(err);
    }
  };

  if (!recipe || Object.keys(recipe).length === 0)
    return <div className="recipe"> </div>;
  return (
    <div className="recipe">
      <figure className="recipe_fig">
        <img
          src={recipe.pictureLink}
          alt={recipe.name}
          className="recipe_img"
        />
        <h1 className="recipe_name">
          <span>{recipe.name}</span>
        </h1>
      </figure>

      <RecipeDetails description={recipe.description} />

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeDirections cookingSteps={recipe.cookingSteps} />
      <button
        className="btn delete_btn"
        onClick={async () => {
          await model.deleteRecipe(recipe.id);
          setRecipe(null);
          await model.loadAll();
          updateResult(model.state.search.results);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default RecipeView;
