import React from 'react';
import Button from './Button.js';
import H1 from './H1.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

const Header = (props) => {

  const location = useLocation();
  const history = useHistory();
  const authStore = useSelector((store) => store.auth);

  React.useEffect(() => {
    if (location.pathname !== '/') {
      !authStore.isAuthenticated && history.replace('/');
    }
  }, [ location, history, authStore.isAuthenticated ]);

  const signOut = async () => {

    const signOutUrl = 'http://localhost:8080/api/signout';

    const response = await axios.get(signOutUrl);
    // TODO: update authStore
    history.replace('/');
    console.log(response);
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