import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./slices/ingredientSlice";
import { userReducer } from "./slices/userSlice";
import { ordersReducer } from "./slices/orderSlice";

// TODO: Заменить на настоящий корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  orders: ordersReducer,
})
