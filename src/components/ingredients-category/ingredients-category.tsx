import { IngredientsCategoryUI } from '@ui';
import { useMemo } from 'react';

import type { TIngredientsCategoryProps } from './type';
import type { TIngredient } from '@utils-types';
import { useSelector } from '@/services/store';
import { constructorBunSelector, constructorIngredientsSelector } from '@/services/selectors';

export const IngredientsCategory = ({
  title,
  titleRef,
  ingredients,
  ref,
}: TIngredientsCategoryProps): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const bun = useSelector(constructorBunSelector);
  const constructorIngredients = useSelector(constructorIngredientsSelector);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    if (bun) counters[bun._id] = 2;
    return counters;

  }, [constructorIngredients, bun]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
};
