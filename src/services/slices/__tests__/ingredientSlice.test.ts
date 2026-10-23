import { SerializedError } from '@reduxjs/toolkit';
import ingredientReducer, { fetchIngredients, initialState } from '../ingredientSlice';
import type { TIngredient } from "../../../utils/types";

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
};

describe('ingredientSlice reducer', () => {
  const initialState = {
    data: [] as TIngredient[],
    loading: false,
    error: null as SerializedError | null,
  };

  it('должен вернуть начальное состояние при неизвестном экшене и undefined state', () => {
    const state = ingredientReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить loading=true и error=null при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить данные и установить loading=false при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockIngredient],
    };
    const state = ingredientReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([mockIngredient]);
    expect(state.error).toBeNull();
  });

  it('должен установить ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: {name: 'Error', message: 'Network Error'},
    };
    const state = ingredientReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error?.message).toBe('Network Error');
  });
});