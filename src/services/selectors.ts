import type { RootState } from "./store";

export const ingredientsSelector = (state: RootState) => state.ingredients.data;
export const ingredientsLoadingSelector = (state: RootState) => state.ingredients.isLoading;
export const ingredientsErrorSelector = (state: RootState) => state.ingredients.error;

export const userDataSelector = (state: RootState) => state.user.user;
export const isAuthCheckedSelector = (state: RootState) => state.user.isAuthChecked;
export const isAuthLoadingSelector = (state: RootState) => state.user.isLoading;
export const authErrorSelector = (state: RootState) => state.user.error;
