import { Preloader, OrderInfoUI } from '@ui';
import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store';

import type { TIngredient } from '@utils-types';
import { fetchOrderByNumber } from '@/services/slices/orderSlice';
import { ingredientsSelector, selectedOrderSelector } from '@/services/selectors';

export const OrderInfo = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const orderData = useSelector(selectedOrderSelector);
  const ingredients = useSelector(ingredientsSelector);

  useEffect(() => {
    if (number && (!orderData || orderData.number !== Number(number))) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
