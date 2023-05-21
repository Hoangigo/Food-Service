import mongoose, { Schema, Document } from 'mongoose';
import { IRecipe } from './recipeModel';
export interface IIngredient extends Document {
  name: string;
  description: string;
  pictureLink: string;
  recipes: Array<Schema.Types.ObjectId | IRecipe>;
}
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [
      40,
      'An ingredient name must have less or equal then 40 characters',
    ],
    minlength: [
      1,
      'An ingredient name must have more or equal then 5 characters',
    ],
  },
  pictureLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});
ingredientSchema.virtual('id').get(function (this: IIngredient) {
  return this._id.toHexString();
});
ingredientSchema.set('toJSON', {
  virtuals: true,
});
const Ingredient = mongoose.model<IIngredient>('Ingredient', ingredientSchema);
export { Ingredient };
