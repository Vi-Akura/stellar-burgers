import { ProfileMenuUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '@/services/store';
import { logoutUser } from '@/services/slices/userSlice';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    // TODO: Разлогинить пользователя
    dispatch(logoutUser())
    .unwrap()
    .then(() => {
      navigate('/', {replace: true});
    })
    .catch((err) => {
      console.error('Ошибка при выходе', err);
      navigate('/', {replace: true});
    })
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
