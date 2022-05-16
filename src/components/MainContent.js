import React, { useEffect, useMemo, useState } from 'react';
import Form from './Form';
import Input from './Input';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MainContent = (props) => {

  const history = useHistory();
  const authStore = useSelector((store) => store.auth);
  const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);
  const currentLocation = useMemo(() => history.location.pathname, [history]);

  useEffect(() => {
    console.log({ isAuthenticated, currentLocation });
    if (currentLocation !== '/') {
      !isAuthenticated && history.replace('/');
    }
  }, [ currentLocation, isAuthenticated, history ]);

  const [ isClicked, setClick ] = useState(false);

  const [ inputValue, updateInputValue ] = useState({
    foodName: '', startDate: '',
    expiryDate: '', compartment: ''
  });

  const {
    foodName,
    startDate,
    expiryDate,
    compartment
  } = inputValue;

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    updateInputValue(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className='container container--main-content'>
      <button 
        id='add' 
        className={ (isClicked ? 'btn btn-primary clicked': 'btn btn-primary') } 
        onClick={() => setClick(!isClicked)}
      >
        + Add Food
      </button>

      <Form 
        className={ (isClicked ? 'add-food__form show' : 'add-food__form')}
        method="POST"
        action='http://localhost:8080/'
      >

        <Input
          className='add-food__input-container'
          labelText='Food Name'
          id='foodName'
          name='foodName'
          inputValue={foodName}
          placeholder='Food name'
          onChange={ handleUpdate }
        />

        <Input
          className='add-food__input-container'
          labelText='Date Cooked/Opened'
          id='startDate'
          name='startDate'
          inputValue={startDate}
          placeholder='Date food was opened or cooked'
          onChange={ handleUpdate }
        />
            
        <Input
          className='add-food__input-container'
          labelText='Expiry Date'
          id='expiryDate'
          name='expiryDate'
          inputValue={expiryDate}
          placeholder='Days until food expires'
          onChange={ handleUpdate }
        />
            
        <Input
          className='add-food__input-container'
          labelText='Compartment'
          id='compartment'
          name='compartment'
          inputValue={compartment}
          placeholder='Regriferator or freezer?'
          onChange={ handleUpdate }
        />

        <button type='submit' className='btn btn-secondary' 
          onClick={() => console.log(inputValue)}
        >
          Add
        </button>

      </Form>
    </div>
  )
};

export default MainContent;