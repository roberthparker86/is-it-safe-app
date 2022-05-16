//import React, { useMemo, useEffect } from 'react';
import React from 'react';
import Button from './Button.js';
import H1 from './H1.js';
import axios from 'axios';
//import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //const authStore = useSelector((store) => store.auth);
  //const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);

  const signOut = async () => {
    const signOutUrl = 'http://localhost:8080/api/signout';
    const response = await axios.get(signOutUrl);
    
    try {
      if (response.status === 200) {
        dispatch({ type: 'LOGOUT'});
        history.replace('/');
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }  
  }

  return (
    <header>
      <div className='container'>
          <H1 className='logo'>
              Is It Safe?
          </H1>

          <Button onClick={signOut}>
            Sign out Meow.
          </Button>
      </div>
    </header>
  );
};

export default Header;