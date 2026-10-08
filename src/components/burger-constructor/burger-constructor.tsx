import { BurgerConstructorUI } from '@ui';
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from '@/services/store';
import { useNavigate, useLocation } from 'react-router-dom';

import type { TConstructorIngredient } from '@utils-types';

import { resetConstructor } from '@/services/slices/constructorSlice';
import { createOrder, clearCurrentOrder } from '@/services/slices/orderSlice';
import {
  constructorBunSelector,
  constructorIngredientsSelector,
  userDataSelector,
  orderRequestSelector,
  currentOrderSelector
} from '@/services/selectors';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bun = useSelector(constructorBunSelector) || null;
  const ingredients = useSelector(constructorIngredientsSelector) || [];
  const user = useSelector(userDataSelector);
  const orderRequest = useSelector(orderRequestSelector) || false;
  const orderModalData = useSelector(currentOrderSelector) || null;

  const constructorItems = {
    bun,
    ingredients,
  };

   useEffect(() => {
    if (orderModalData) {
      dispatch(resetConstructor());
    }
  }, [orderModalData, dispatch]);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(item => item._id)
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = (): void => {
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems.bun, constructorItems.ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
