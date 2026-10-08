import { BurgerConstructorElementUI } from '@ui';
import { memo } from 'react';
import { useDispatch } from '@/services/store';
import { removeIngredient, moveIngredient } from '@/services/slices/constructorSlice';

import type { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement = memo(function BurgerConstructorElement({
  ingredient,
  index,
  totalItems,
}: BurgerConstructorElementProps): React.JSX.Element {
  const dispatch = useDispatch();

  const handleMoveDown = (): void => {
    // TODO: Реализовать перемещение вниз
    dispatch(removeIngredient(ingredient.id))
  };

  const handleMoveUp = (): void => {
    // TODO: Реализовать перемещение вверх
    dispatch(moveIngredient({id: ingredient.id, direction: 'up'}))
  };

  const handleClose = (): void => {
    dispatch(removeIngredient(ingredient.id));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
});
