import express from 'express';
import {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  setIngredientId,
} from './../controllers/recipeController';

const router = express.Router({ mergeParams: true });
router.route('/').get(getAllRecipes).post(createRecipe(), setIngredientId);

router.route('/:id').get(getRecipe).patch(updateRecipe).delete(deleteRecipe);

export default router;
