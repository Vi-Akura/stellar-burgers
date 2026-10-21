import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { ProfileMenu, OrdersList } from '@components';

import { fetchOrders } from '@/services/slices/orderSlice';
import { ordersSelector } from '@/services/selectors';

import styles from './profile-orders.module.css';

export const ProfileOrdersUI = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};
