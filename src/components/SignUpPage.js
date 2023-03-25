import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useHistory } from 'react-router-dom';

const SignUpPage = props => {
  const history = useHistory();

  const [ loginForm, updateLoginForm ] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleLoginChange = e => {
    const { name, value } = e.target;
    updateLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const apiUrl = 'http://localhost:8080/api/';
  const submitForm = async (firstName, email, password) => {
    const credentials = {
      firstName,
      email: email.toLowerCase(),
      password
    };



    try {
      const response = await axios.post(`${apiUrl}signup`, credentials);

      if (response) {
        console.log(response);
        history.push('/');
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
            id="firstName"
            inputValue={loginForm.firstName}
            onChange={handleLoginChange}
          />
          
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
              submitForm(loginForm.firstName, loginForm.email, loginForm.password);
              e.preventDefault();
            }}>
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUpPage;
