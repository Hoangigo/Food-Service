import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';
export const deleteOne = <T extends Model<any>>(Model: T) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = <T extends Model<any>>(Model: T) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getOne = <T extends Model<any>>(
  Model: T,
  popOptions?: { path: string; select?: string }
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = <T extends Model<any>>(Model: T) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    let filter = {};
    if (req.params.ingredientId) {
      filter = { ingredients: req.params.ingredientId };
    } else if (req.params.recipeId) {
      filter = { recipes: req.params.recipeId };
    }
    if (req.query.recipe) {
      filter = { recipes: req.query.recipe };
    } else if (req.query.ingredient) {
      filter = { ingredients: req.query.ingredient };
    }
    if (req.query.name) filter = { name: req.query.name };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);

    res.status(200).json({
      status: 'success',
      //results: doc.length,
      data: {
        data: doc,
      },
    });
  });
