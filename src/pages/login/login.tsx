import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useDispatch } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/slices/userSlice';


export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

  dispatch(loginUser({email, password}))
    .unwrap()
    .then(() => {
      navigate('/');
    })
    .catch((err) => {
      console.error("Ошибка входа", err);
    })
  };

  return (
    <LoginUI
      errorText=""
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
