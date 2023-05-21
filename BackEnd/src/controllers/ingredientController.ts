import { Ingredient } from './../models/ingredientModel';
import { getAll, updateOne, deleteOne, getOne } from './handlerFactory';
import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { Recipe } from '../models/recipeModel';

export const setRecipeId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Allow nested routes

  if (!req.body.recipe) {
    req.body.recipe = req.params.recipeId;
  }

  next();
};
export const getAllIngredients = getAll(Ingredient);
export const getIngredient = getOne(Ingredient, { path: 'recipes' });
export const createIngredient = () =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const items = req.body;
    let checkArray = true;
    const createdItems: any[] = [];
    let doc;

    if (items && Array.isArray(items)) {
      for (const item of items) {
        const existingIngredient = await Ingredient.findOne({
          name: item.name,
        });
        if (existingIngredient) {
          // Recipe with the same name already exists, skip adding ingredients and recipe
          return res.status(400).json({
            status: 'error',
            message: 'Ingredient with the same name already exists.',
          });
        }
        if (item.recipes) {
          const createdRecipes = await Promise.all(
            item.recipes.map(async (recipe: any) => {
              let existingRecipe = await Recipe.findOne({
                name: recipe.name,
              });
              if (!existingRecipe) existingRecipe = await Recipe.create(recipe);
              return existingRecipe._id;
            })
          );
          item.recipes = createdRecipes;
        }
        const createdItem = await Ingredient.create(item);
        createdItems.push(createdItem);

        if (item.recipes) {
          await Recipe.updateMany(
            { _id: { $in: item.recipes } },
            { $push: { ingredients: createdItem._id } }
          );
        }
      }
    } else {
      checkArray = false;
      const existingIngredient = await Ingredient.findOne({ name: items.name });
      if (existingIngredient) {
        // Recipe with the same name already exists, skip adding ingredients and recipe
        return res.status(400).json({
          status: 'error',
          message: 'Ingredient with the same name already exists.',
        });
      }
      if (items.recipes) {
        const createdRecipes = await Promise.all(
          items.recipes.map(async (recipe: any) => {
            let existingRecipe = await Recipe.findOne({
              name: recipe.name,
            });
            if (!existingRecipe) existingRecipe = await Recipe.create(recipe);
            return existingRecipe._id;
          })
        );
        items.recipes = createdRecipes;
      }
      doc = await Ingredient.create(items);

      if (items.recipes) {
        await Recipe.updateMany(
          { _id: { $in: items.recipes } },
          { $push: { ingredients: doc._id } }
        );
      }
    }

    res.status(201).json({
      status: 'success',
      data: checkArray ? createdItems : doc,
    });
  });
export const updateIngredient = updateOne(Ingredient);
export const deleteIngredient = deleteOne(Ingredient);
