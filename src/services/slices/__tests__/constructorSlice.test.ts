import constructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient,
} from '../constructorSlice';
import type { TConstructorIngredient, TIngredient } from '../../../utils/types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
};

const mockFilling: TIngredient = {
  _id: 'filling-1',
  name: 'Начинка',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: '',
  image_mobile: '',
  image_large: '',
};

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null as TConstructorIngredient | null,
    ingredients: [] as TConstructorIngredient[],
  };

  it('должен вернуть начальное состояние при неизвестном экшене и undefined state', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен добавить булку при addIngredient', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);
    expect(state.bun).not.toBeNull();
    expect(state.bun?._id).toBe('bun-1');
  });

  it('должен добавить начинку при addIngredient', () => {
    const action = addIngredient(mockFilling);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('filling-1');
  });

  it('должен удалить начинку по id при removeIngredient', () => {
    const fillingWithId: TConstructorIngredient = { ...mockFilling, id: 'test-id' };
    const stateWithIngredient = { ...initialState, ingredients: [fillingWithId] };
    const action = removeIngredient('test-id');
    const state = constructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен переместить начинку вверх при moveIngredient (direction: up)', () => {
    const item1: TConstructorIngredient = { ...mockFilling, id: 'id-1' };
    const item2: TConstructorIngredient = { ...mockFilling, id: 'id-2' };
    const stateWithTwo = { ...initialState, ingredients: [item1, item2] };
    
    const action = moveIngredient({ id: 'id-2', direction: 'up' });
    const state = constructorReducer(stateWithTwo, action);
    
    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
  });

    it('должен переместить начинку вниз при moveIngredient direction=down', () => {
    const item1: TConstructorIngredient = { ...mockFilling, id: 'id-1' };
    const item2: TConstructorIngredient = { ...mockFilling, id: 'id-2' };
    const item3: TConstructorIngredient = { ...mockFilling, id: 'id-3' };
    const stateWithThree = { 
      ...initialState, 
      ingredients: [item1, item2, item3] 
    };
    
    const action = moveIngredient({ id: 'id-1', direction: 'down' });
    const state = constructorReducer(stateWithThree, action);
    
    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
    expect(state.ingredients[2].id).toBe('id-3');
  });

  it('не должен перемещать элемент вверх, если он первый', () => {
    const item1: TConstructorIngredient = { ...mockFilling, id: 'id-1' };
    const item2: TConstructorIngredient = { ...mockFilling, id: 'id-2' };
    const stateWithTwo = { ...initialState, ingredients: [item1, item2] };
    
    const action = moveIngredient({ id: 'id-1', direction: 'up' });
    const state = constructorReducer(stateWithTwo, action);
    
    expect(state.ingredients[0].id).toBe('id-1');
    expect(state.ingredients[1].id).toBe('id-2');
  });

  it('не должен перемещать элемент вниз, если он последний', () => {
    const item1: TConstructorIngredient = { ...mockFilling, id: 'id-1' };
    const item2: TConstructorIngredient = { ...mockFilling, id: 'id-2' };
    const stateWithTwo = { ...initialState, ingredients: [item1, item2] };
    
    const action = moveIngredient({ id: 'id-2', direction: 'down' });
    const state = constructorReducer(stateWithTwo, action);
    
    expect(state.ingredients[0].id).toBe('id-1');
    expect(state.ingredients[1].id).toBe('id-2');
  });

  it('должен очистить конструктор при resetConstructor', () => {
    const stateWithItems = {
      bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
      ingredients: [{ ...mockFilling, id: 'filling-id' }],
    };
    const action = resetConstructor();
    const state = constructorReducer(stateWithItems, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});