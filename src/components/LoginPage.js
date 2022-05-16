import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authStore = useSelector((store) => store.auth);
  const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);  
  const currentLocation = useMemo(() => history.location.pathname, [history]);

  useEffect(() => {
    if (currentLocation !== '/') {
      !isAuthenticated && history.replace('/');
    }
  }, [currentLocation, isAuthenticated, history]);

  const [ loginForm, updateLoginForm ] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    updateLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const apiUrl = 'http://localhost:8080/api/';
  const submitForm = async (email, password) => {

    const credentials = {
      email,
      password
    };

    try {        
      const { data } = await axios.post(`${apiUrl}signin`, credentials);

      if (data) {
        dispatch({
          type: 'LOGIN',
          isAuthenticated: true
        });
        history.push('/dashboard');
      }
    } catch (err) {
      console.trace(err);
    }
  };

  return (
    <>
      <Header />

      <div className='container container--login'>
        <Form className='login-form'>
          <Input className='login-form__input' id="email" inputValue={loginForm.email} onChange={handleLoginChange} />

          <Input className='login-form__input' id="password" inputValue={loginForm.password} onChange={handleLoginChange} />

          <Button className='login-form__btn' onClick={ (e) => {
            submitForm(loginForm.email, loginForm.password);
            e.preventDefault();
          } }>Submit</Button>
        </Form>
      </div>

      { isAuthenticated &&
        <div>
          <Link to={'/secret'}>
            To the secret sauce
          </Link>
        </div>
      }

    </>        
  );
};

export default LoginPage;