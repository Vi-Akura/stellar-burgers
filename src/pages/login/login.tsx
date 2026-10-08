import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useDispatch } from '@/services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '@/services/slices/userSlice';


export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    setErrorText('');

  dispatch(loginUser({email, password}))
    .unwrap()
    .then(() => {
      navigate(from, { replace: true});
    })
    .catch((err) => {
      console.error("Ошибка входа", err);
      setErrorText(err.message || 'Произошла ошибка при входе');
    })
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
