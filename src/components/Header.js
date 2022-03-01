import React, { useState } from 'react';
import H1 from './H1.js';
import Form from './Form.js';
import Input from './Input.js';

const Header = (props) => {

    const [ loginForm, updateLoginForm ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = loginForm;

    const handleLoginChange = (e) => {

        const { name, value } = e.target;

        updateLoginForm((prev) => {
            
            return {
                ...prev,
                [name]: value
            };
        });
    };

    return (
        <header>
            <div className='container'>
                <H1 className='logo'>
                    Is It Safe?
                </H1>

                <Form className="login-form" action="localhost:8080/api/signin">

                    <Input
                        className='login-form__input'
                        id='username'
                        name='username'
                        inputValue={username}
                        placeholder='Username'
                        labelText='Username'
                        onChange={handleLoginChange}
                    />
                    <Input
                        className='login-form__input'
                        id='password'
                        name='password'
                        inputValue={password}
                        placeholder='Password'
                        labelText='Password'
                        onChange={handleLoginChange}
                    />

                    <button type='submit' className='login-form__btn'>
                        <i className="fas fa-sign-out-alt fa-2x"></i>
                        Login
                    </button>
                </Form>
            </div>
	    </header>  
    );
};

export default Header;