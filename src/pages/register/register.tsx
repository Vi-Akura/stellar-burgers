import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useDispatch } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/slices/userSlice';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    dispatch(registerUser({name: userName, email, password}))
      .unwrap()
      .then(()=> navigate('/'))
      .catch((err) => {
        console.error("Ошибка регистрации", err)
      })
  };

  return (
    <RegisterUI
      errorText=""
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
