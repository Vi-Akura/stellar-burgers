import { combineReducers } from "@reduxjs/toolkit";
import ingredientReducer from './slices/ingredientSlice';
import userReducer from "./slices/userSlice";
import bugerConstructorReducer from './slices/constructorSlice';
import  ordersReducer  from "./slices/orderSlice";
import feedReducer from './slices/feedSlice';

// TODO: Заменить на настоящий корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  user: userReducer,
  burgerConstructor: bugerConstructorReducer,
  orders: ordersReducer,
  feed: feedReducer,
})
