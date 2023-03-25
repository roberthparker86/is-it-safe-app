//import React, { useMemo, useEffect } from 'react';
import React, { useMemo } from 'react';
import Button from './Button.js';
import H1 from './H1.js';
import axios from 'axios';
//import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

const Header = (props) => {
  const dispatch = useDispatch();
  const authStore = useSelector((store) => store.auth);
  const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);

  const signOut = async () => {
    const signOutUrl = 'http://localhost:8080/api/signout';
    const response = await axios.get(signOutUrl);

    if (response.status === 200) {
      dispatch({ type: 'LOGOUT' });
    }
  }

  return (
    <header>
      <div className='container'>
          <H1 className='logo'>
              Is It Safe?
          </H1>
        { isAuthenticated && 
          <Button className='signout__btn' onClick={signOut}>
            <i className="fas fa-sign-out-alt"></i>
            <h4>Signout</h4>
          </Button>
        }          
      </div>
    </header>
  );
};

export default Header;