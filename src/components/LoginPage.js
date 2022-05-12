import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';




const LoginPage = (props) => {
  const dispatch = useDispatch();
  const authStore = useSelector((store) => store.auth);

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

      { authStore.isAuthenticated &&
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