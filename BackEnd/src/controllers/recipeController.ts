import { Recipe } from './../models/recipeModel';
import { Model } from 'mongoose';
import { Ingredient } from '../models/ingredientModel';
import { getAll, updateOne, deleteOne, getOne } from './handlerFactory';
import catchAsync from '../utils/catchAsync';

import { Request, Response, NextFunction } from 'express';

export const setIngredientId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Allow nested routes

  if (!req.body.ingredient) {
    req.body.ingredient = req.params.ingredientId;
  }

  next();
};
export const getAllRecipes = getAll(Recipe);
export const getRecipe = getOne(Recipe, { path: 'ingredients' });
export const createRecipe = () =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const items = req.body;
    let checkArray = true;
    const createdItems: any[] = [];
    let doc;
    if (items && Array.isArray(items)) {
      for (const item of items) {
        const existingRecipe = await Recipe.findOne({ name: item.name });
        if (existingRecipe) {
          // Recipe with the same name already exists, skip adding ingredients and recipe
          return res.status(400).json({
            status: 'error',
            message: 'Recipe with the same name already exists.',
          });
        }
        if (item.ingredients) {
          const createdIngredients = await Promise.all(
            item.ingredients.map(async (ingredient: any) => {
              let existingIngredient = await Ingredient.findOne({
                name: ingredient.name,
              });
              if (!existingIngredient)
                existingIngredient = await Ingredient.create(ingredient);
              return existingIngredient._id;
            })
          );
          item.ingredients = createdIngredients;
        }
        const createdItem = await Recipe.create(item);
        createdItems.push(createdItem);

        if (item.ingredients) {
          await Ingredient.updateMany(
            { _id: { $in: item.ingredients } },
            { $push: { recipes: createdItem._id } }
          );
        }
      }
    } else {
      checkArray = false;
      const existingRecipe = await Recipe.findOne({ name: items.name });
      if (existingRecipe) {
        // Recipe with the same name already exists, skip adding ingredients and recipe
        return res.status(400).json({
          status: 'error',
          message: 'Recipe with the same name already exists.',
        });
      }
      if (items.ingredients) {
        const createdIngredients = await Promise.all(
          items.ingredients.map(async (ingredient: any) => {
            let existingIngredient = await Ingredient.findOne({
              name: ingredient.name,
            });
            if (!existingIngredient)
              existingIngredient = await Ingredient.create(ingredient);
            return existingIngredient._id;
          })
        );
        items.ingredients = createdIngredients;
      }
      doc = await Recipe.create(items);
      if (items.ingredients) {
        await Ingredient.updateMany(
          { _id: { $in: items.ingredients } },
          { $push: { recipes: doc._id } }
        );
      }
    }

    res.status(201).json({
      status: 'success',
      data: checkArray ? createdItems : doc,
    });
  });
export const updateRecipe = updateOne(Recipe);
export const deleteRecipe = deleteOne(Recipe);
