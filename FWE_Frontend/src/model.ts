import { API_URL } from "./config";
import { AJAX } from "./helpers";

export const state = {
  recipe: {} as Recipe,
  search: {
    query: "",
    results: [] as Recipe[],
  },
};
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ratings: number;
  cookingSteps: string[];
  pictureLink: string;
  ingredients: any[];
  key: string;
}
export interface Ingredient {
  id: string;
  name: string;
  pictureLink: string;
  description: string;
}
export const loadRecipe = async function (id: string) {
  try {
    const data = await AJAX(`${API_URL}recipes/${id}`);
    state.recipe = createRecipeObject(data);
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
export const createRecipeObject = function (data: any): Recipe {
  //const { recipe } = data.data;
  const recipe = data.data.data ? data.data.data : data.data;
  return {
    id: recipe.id,
    name: recipe.name,
    pictureLink: recipe.pictureLink,
    ratings: recipe.ratings,
    description: recipe.description,
    cookingSteps: recipe.cookingSteps,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadSearchResults = async function (query: string) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}recipes?name=${query}`);
    state.search.results = data.data.data.map((rec: any) => {
      return {
        id: rec.id,
        name: rec.name,
        ingredients: rec.ingredients,
        description: rec.description,
        cookingSteps: rec.cookingSteps,
        pictureLink: rec.pictureLink,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
export const loadAll = async function () {
  try {
    const data = await AJAX(`${API_URL}recipes`);
    state.search.results = data.data.data.map((rec: any) => {
      return {
        id: rec.id,
        name: rec.name,
        ingredients: rec.ingredients,
        description: rec.description,
        cookingSteps: rec.cookingSteps,
        pictureLink: rec.pictureLink,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
export const uploadRecipe = async function (newRecipe: any) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing: any) => {
        const ingArr = ing[1].split(";").map((el: any) => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient fromat! Please use the correct format :)"
          );

        const [name, description, pictureLink] = ingArr;
        return {
          name: name,
          description: description,
          pictureLink: pictureLink,
        };
      });
    const cookingSteps = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("cookingStep") && entry[1] !== "")
      .map((ing: any) => ing[1]);

    const recipe = {
      name: newRecipe.name,
      pictureLink: newRecipe.pictureLink,
      description: newRecipe.description,
      ratings: +newRecipe.ratings,
      cookingSteps,
      ingredients,
    };
    const data = await AJAX(`${API_URL}recipes`, recipe);
    state.recipe = createRecipeObject(data);
  } catch (err) {
    throw err;
  }
};
export const deleteRecipe = async function (id: string) {
  try {
    const response = await fetch(`${API_URL}recipes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the resource");
    }
  } catch (error) {
    console.error(error);
  }
};
