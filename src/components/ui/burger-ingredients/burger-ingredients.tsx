import { IngredientsCategory } from '@components';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { BurgerIngredientsUIProps } from './type';

import styles from './burger-ingredients.module.css';

export const BurgerIngredientsUI = memo(function BurgerIngredientsUI({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick,
}: BurgerIngredientsUIProps): React.JSX.Element {
  return (
    <>
      <section className={styles.burger_ingredients} data-testid="ingredients-content">
        <nav>
          <ul className={styles.menu}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
              Начинки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content} data-testid="bun-ingredients">
          <div data-testid="bun-ingredients">
          <IngredientsCategory
            title="Булки"
            titleRef={titleBunRef}
            ingredients={buns}
            ref={bunsRef}
          />
        </div>
        <div data-testid="mains-ingredients">
          <IngredientsCategory
            title="Начинки"
            titleRef={titleMainRef}
            ingredients={mains}
            ref={mainsRef}
          />
        </div>
        <div data-testid="sauces-ingredients">
          <IngredientsCategory
            title="Соусы"
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ref={saucesRef}
          />
        </div>
        </div>
      </section>
    </>
  );
});
