import React, { 
  // useMemo, 
  useState, 
  // useEffect 
} from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginPage = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginForm, updateLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = e => {
    const { name, value } = e.target;
    updateLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const apiUrl = 'http://localhost:8080/api/';
  const submitForm = async (email, password) => {
    const credentials = {
      email: email.toLowerCase(),
      password
    };

    try {
      const { data } = await axios.post(`${apiUrl}signup`, credentials);

      if (data) {
        dispatch({
          type: 'LOGIN',
          isAuthenticated: true,
          user: data.user
        });
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="container container--login">
        <h4>
          Please enter a valid email address and password to create a user
          account.
        </h4>
        <Form className="login-form">
          <Input
            className="login-form__input"
            id="email"
            inputValue={loginForm.email}
            onChange={handleLoginChange}
          />

          <Input
            className="login-form__input"
            id="password"
            inputValue={loginForm.password}
            onChange={handleLoginChange}
          />

          <Button
            className="login-form__btn"
            onClick={e => {
              submitForm(loginForm.email, loginForm.password);
              e.preventDefault();
            }}>
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
