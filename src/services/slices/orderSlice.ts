import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TOrder } from "@/utils/types";

import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi,
} from "@/utils/burger-api";

type TOrdersState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredientsIds: string[]) => {
    const response = await orderBurgerApi(ingredientsIds);
    return response;
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.orderRequest = false;
      });
  },
});

export const { clearOrderModal } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
