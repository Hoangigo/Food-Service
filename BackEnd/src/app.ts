import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import ingredientRouter from './routes/ingredientRoutes';
import recipeRouter from './routes/recipeRoutes';
//import viewRouter from './routes/viewRoutes';

const app = express();
/*
app.set('views', path.join(__dirname, 'views'));
// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
*/
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
// 3) ROUTES
//app.use('/', viewRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/recipes', recipeRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
