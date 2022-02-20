import React from 'react';
import H1 from './H1.js';
import Form from './Form.js';
import Input from './Input.js';

const Header = (props) => {

    return (
        <header>
            <div className='header-content__container'>
                <H1 className='logo'>
                    Is It Safe?
                </H1>

                <Form className="login-form" action="/api/signin">

                    <Input
                        className='login-form__input'
                        id='username'
                        placeholder='Username'
                        labelText='Username'
                    />
                    <Input
                        className='login-form__input'
                        id='password'
                        placeholder='Password'
                        labelText='Password'
                    />

                    <button type='submit' className='login-form__btn'>
                        <i class="fas fa-sign-out-alt fa-2x"></i>
                        Login
                    </button>
                </Form>
            </div>
	    </header>  
    );
};

export default Header;