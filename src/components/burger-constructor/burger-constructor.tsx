import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';

import type { TConstructorIngredient, TConstructorState } from '@utils-types';

import { useSelector, useDispatch } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '@/services/selectors';

import { clearOrderModal, createOrder } from '@/services/slices/orderSlice';
import { clearConstructor } from '@/services/slices/constructorIngSlice';
import { orderRequestSelector, orderModalDataSelector } from '@/services/selectors';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);

  /** TODO: Взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: TConstructorState = {
    bun: null,
    ingredients: [],
  };

  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = (): void => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    // TODO: Оформить заказ

    const ingredientsId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
    ];

    dispatch(createOrder(ingredientsId))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor())
      })
      .catch((err) => {
        console.error("Ошибка создания заказа", err)
      })
  };

  const closeOrderModal = (): void => {
    // TODO: Закрыть модальное окно и сбросить заказ
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
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
