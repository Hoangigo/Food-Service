import mongoose, { Schema, Document } from 'mongoose';
import { IIngredient } from './ingredientModel';
export interface IRecipe extends Document {
  name: string;
  description: string;
  ratings: number;
  cookingSteps: string[];
  pictureLink: string;
  ingredients: Array<Schema.Types.ObjectId | IIngredient>;
}
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [40, 'A recipe name must have less or equal then 40 characters'],
    minlength: [1, 'A recipe name must have more or equal then 1 character'],
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  cookingSteps: {
    type: [String],
    required: true,
  },
  pictureLink: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
});
recipeSchema.virtual('id').get(function (this: IRecipe) {
  return this._id.toHexString();
});
recipeSchema.set('toJSON', {
  virtuals: true,
});
const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
export { Recipe };
