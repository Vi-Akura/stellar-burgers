import type { RootState } from "./store";

export const ingredientsSelector = (state: RootState) => state.ingredients.data;
export const ingredientsLoadingSelector = (state: RootState) => state.ingredients.isLoading;
export const ingredientsErrorSelector = (state: RootState) => state.ingredients.error;

export const userDataSelector = (state: any) => state.user?.user;
export const isAuthCheckedSelector = (state: any) => state.user?.isAuthChecked ?? true;
