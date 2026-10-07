import type { RootState } from "./store";

export const ingredientsSelector = (state: RootState) => state.ingredients.data;
export const ingredientsLoadingSelector = (state: RootState) => state.ingredients.loading;
export const ingredientsErrorSelector = (state: RootState) => state.ingredients.error;

export const userDataSelector = (state: RootState) => state.user.user;
export const isAuthCheckedSelector = (state: RootState) => state.user.isAuthChecked;
export const authErrorSelector = (state: RootState) => state.user.error;

export const constructorBunSelector = (state: RootState) => state.burgerConstructor.bun;
export const constructorIngredientsSelector = (state: RootState) => state.burgerConstructor.ingredients;

export const orderRequestSelector = (state: RootState) => state.orders.orderRequest;
export const currentOrderSelector = (state: RootState) => state.orders.currentOrder;
export const ordersSelector = (state: RootState) => state.orders.orders;

export const feedOrdersSelector = (state: RootState) => state.feed.orders;
export const feedTotalSelector = (state: RootState) => state.feed.total;
export const feedTotalTodaySelector = (state: RootState) => state.feed.totalToday;
export const feedLoadingSelector = (state: RootState) => state.feed.isLoading;
export const feedErrorSelector = (state: RootState) => state.feed.error;
