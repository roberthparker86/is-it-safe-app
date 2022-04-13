import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const LoginPage = (props) => {

  const apiUrl = 'http://localhost:8080/api/';

  // axios.interceptors.request.use(
  //     config => {

  //         const { origin } = new URL(config.url);
  //         const allowedOrigins = [apiUrl];
  //         const token = localStorage.getItem('token');

  //         // .includes() is an Array prototype method
  //         if (allowedOrigins.includes(origin)) {
  //             config.headers.authorization = `Bearer ${token}`;
  //         };

  //         return config; 
  //     },
  //     error => {
  //         return Promise.reject(error);
  //     }
  // );

  const [ loginForm, updateLoginForm ] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {

    const { name, value } = e.target;

    updateLoginForm((prev) => {
        
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const submitForm = async (email, password) => {

    const credentials = {
      email,
      password
    };

    try {
        
      const { data } = await axios.post(`${apiUrl}signin`, credentials);

      if (data) {
        props.dispatch({
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

          <Button className='login-form__btn' onClick={(e) => {
            e.preventDefault();
          }}>Show Token Data</Button>
        </Form>
      </div>

      { props.isAuthenticated &&
        <div>
          <Link to={'/secret'}>
            To the secret sauce
          </Link>
        </div>
      }

    </>        
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LoginPage);