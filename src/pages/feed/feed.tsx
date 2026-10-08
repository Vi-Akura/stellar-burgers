import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '@/services/store';

import { fetchFeeds } from '@/services/slices/feedSlice';
import {
  feedOrdersSelector,
  feedTotalSelector,
  feedTotalTodaySelector,
  feedLoadingSelector
} from '@/services/selectors';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(feedOrdersSelector);
  const total = useSelector(feedTotalSelector);
  const totalToday = useSelector(feedTotalTodaySelector);
  const isLoading = useSelector(feedLoadingSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    dispatch(fetchFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      total={total}
      totalToday={totalToday}
      handleGetFeeds={handleGetFeeds}
    />
  );
};
