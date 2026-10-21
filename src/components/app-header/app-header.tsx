import { AppHeaderUI } from '@ui';
import { useSelector } from '@/services/store';
import { userDataSelector } from '@/services/selectors';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  const user = useSelector(userDataSelector);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
