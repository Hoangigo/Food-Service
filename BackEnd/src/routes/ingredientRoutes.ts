import express from 'express';
import {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  setRecipeId,
} from './../controllers/ingredientController';

const router = express.Router({ mergeParams: true });
router.route('/').get(getAllIngredients).post(createIngredient(), setRecipeId);

router
  .route('/:id')
  .get(getIngredient)
  .patch(updateIngredient)
  .delete(deleteIngredient);

export default router;
