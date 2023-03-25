import React, { useMemo, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header.js';
import MainContent from './components/MainContent';
import Login from './components/Login';


const App = () => {
  const dispatch = useDispatch(),
    authStore = useSelector(store => store.auth),
    isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);

  const checkToken = async () => {
    const apiUrl = 'http://localhost:8080/api/';

    const { data } = await axios.get(`${apiUrl}check-token`);
    return data.success;
  };

  useEffect(() => {
    (async function () {
      const isValidated = await checkToken();

      if (isValidated && !isAuthenticated) {
        dispatch({
          type: 'LOGIN',
          isAuthenticated: true
        });
      }
    })();
  }, [isAuthenticated, dispatch]);
	
	return (
		<>
			<Header />
      { isAuthenticated ? ( 
        <MainContent /> 
      ) : (
        <Login /> 
      )}			
		</>

	);
};

export default App;
