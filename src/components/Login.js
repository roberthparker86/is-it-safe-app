import React, { useMemo, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { sortByTimeLeft } from '../controllers/controllers';

const LoginPage = props => {
  const dispatch = useDispatch();

  const [ loginForm, updateLoginForm ] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = e => {
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
      const { data } = await axios.post(`${apiUrl}signin`, credentials),
        { user } = data;

      if (user) {        
        user.freezer.sort((a, b) => sortByTimeLeft(a, b));
        user.refrigerator.sort((a, b) => sortByTimeLeft(a, b));
        dispatch({
          type: 'LOGIN',
          isAuthenticated: true,
          user
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='container container--login'>
        <Form className='login-form'>
          <Input className='login-form__input' id='email' inputValue={loginForm.email} onChange={handleLoginChange} />

          <Input className='login-form__input' id='password' type='password' inputValue={loginForm.password} onChange={handleLoginChange} />

          <Button className='login-form__btn' onClick={(e) => {
            submitForm(loginForm.email, loginForm.password);
            e.preventDefault();
          }}>
            Login
          </Button>
        </Form>
        <h4>or Sign Up</h4>
      </div>
    </>        
  );
};

export default LoginPage;
