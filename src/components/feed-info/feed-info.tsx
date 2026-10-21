import { FeedInfoUI } from '@ui';
import { useSelector } from 'react-redux';

import type { TOrder } from '@utils-types';
import { feedOrdersSelector } from '@/services/selectors';

type TFeedInfoProps = {
  total: number;
  totalToday: number;
};

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = ({ total, totalToday }: TFeedInfoProps): React.JSX.Element => {
  const orders = useSelector(feedOrdersSelector);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    orders,
    total,
    totalToday,
    isLoading: false,
    error: null,
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
