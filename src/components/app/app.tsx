import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { Routes, Route, useNavigate } from 'react-router-dom';

import type { AppContentProps } from './type';

import '../../index.css';

import styles from './app.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { useLocation } from 'react-router-dom';
import { fetchIngredients } from '@/services/slices/ingredientSlice';
import { fetchAuthUser } from '@/services/slices/userSlice';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
 } from '@pages';

 import {
  OrderInfo,
  IngredientDetails,
  Modal
 } from '@components';

 import { ProtectedRoute } from '../protectedroute/protected-route';

 import {
  ingredientsSelector,
  ingredientsLoadingSelector,
  ingredientsErrorSelector,
 } from '@/services/selectors';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);
  const isIngredientsLoading = useSelector(ingredientsLoadingSelector);
  const ingredientsError = useSelector(ingredientsErrorSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent
        ingredients={ingredients}
        isLoading={isIngredientsLoading}
        error={ingredientsError}
      />
    </div>
  );
};

export default App;

const AppContent = ({
  ingredients,
  isLoading,
  error,
}: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты
        {error.message ? `: ${error.message}` : '.'}
      </p>
    );
  }

  if (!ingredients.length) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Нет ингредиентов
      </p>
    );
  }

  return <RouteComponent />;
};

const RouteComponent = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />

        <Route path="/feed/:number" element={<Feed />} />
        <Route path="/ingredients/:id" element={<ConstructorPage />} />

        <Route
          path="/login"
          element={<ProtectedRoute unAuth component={<Login />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute unAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute unAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute unAuth component={<ResetPassword />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute auth component={<Profile />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRoute auth component={<ProfileOrders />} />}
        />
        <Route
          path="/profile/orders/:number"
          element={<ProtectedRoute auth component={<ProfileOrders />} />}
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal title="Детали заказа" onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal title="Детали заказа" onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
