import React from 'react';
import Button from './Button.js';
import H1 from './H1.js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Header = (props) => {

  const location = useLocation();

  React.useEffect(async () => {

    try {
      const hasToken = await axios.get('http://localhost:8080/token/');
      console.log(hasToken);
    } catch (err) {
      console.log(err);
    }
  }, [location]);

  const signOut = async () => {

    const signOutUrl = 'http://localhost:8080/api/signout';

    const response = await axios.get(signOutUrl);

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