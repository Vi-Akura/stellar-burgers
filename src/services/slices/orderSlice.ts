import { createSlice, createAsyncThunk, type SerializedError } from '@reduxjs/toolkit';
import type { TOrder } from '@/utils/types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

type TOrderState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  selectedOrder: TOrder | null;
  orderRequest: boolean;
  error: SerializedError | null;
};

const initialState: TOrderState = {
  orders: [],
  currentOrder: null,
  selectedOrder: null,
  orderRequest: false,
  error: null,
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/createOrder',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response.order;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOrders = createAsyncThunk<TOrder[]>(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchOrderByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error || null;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error || null;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.error = action.error || null;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
