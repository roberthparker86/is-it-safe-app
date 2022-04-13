import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
//import LoadingPage from './components/LoginPage';

/*  
    Initialize redux store then pass to app through
    the Provider Component
*/
const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// let hasRendered = false;

// const renderApp = () => {

//     if (!hasRendered) {

//         ReactDOM.render(jsx, document.getElementById('root'));
//         hasRendered = true;
//     }
// };

ReactDOM.render(jsx, document.getElementById('root'));

//renderApp();

