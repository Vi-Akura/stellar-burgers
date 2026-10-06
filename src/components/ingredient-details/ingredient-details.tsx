import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';

import { ingredientsSelector } from '@/services/selectors';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(ingredientsSelector);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
