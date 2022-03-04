import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import axios from 'axios';

const LoginPage = () => {

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

    const submitForm = async (userEmail, userPassword) => {

        console.log('submitForm fired with these args: ', userEmail, userPassword);

        axios.post('http://localhost:8080/api/signin', {
            email: userEmail,
            password: userPassword
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };

    return (
        <Form className='login-form'>
            <Input className='login-form__input' id="email" inputValue={loginForm.email} onChange={handleLoginChange} />
            <Input className='login-form__input' id="password" inputValue={loginForm.password} onChange={handleLoginChange} />
            <Button onClick={ (e) => {
                e.preventDefault();
                submitForm(loginForm.email, loginForm.password);
            } }>Submit</Button>
        </Form>
    );
};

export default LoginPage;