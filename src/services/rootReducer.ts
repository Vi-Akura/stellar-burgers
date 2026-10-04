import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./slices/ingredientSlice";

// TODO: Заменить на настоящий корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})
