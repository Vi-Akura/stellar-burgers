import { createSlice } from "@reduxjs/toolkit";
import type { TConstructorIngredient, TIngredient } from "@/utils/types";

type TConstructorIngState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorIngState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;

      const constructorIngredient: TConstructorIngredient = {
        ...ingredient,
        id: Math.random().toString(),
      }

      if (ingredient.type === 'bun') {
        state.bun = constructorIngredient;
      } else {
        state.ingredients.push(constructorIngredient);
      }
    },

    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
