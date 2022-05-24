import React, { useEffect, useMemo, useState } from 'react';
import Form from './Form';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MainContent = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authStore = useSelector(store => store.auth);
  const userStore = useSelector(store => store.user);
  const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);
  const currentLocation = useMemo(() => history.location.pathname, [history]);
  const user = useMemo(() => userStore.user, [userStore]);

  useEffect(() => {
    console.log({ isAuthenticated, currentLocation });
    if (currentLocation !== '/') {
      !isAuthenticated && history.replace('/');
    }
  }, [currentLocation, isAuthenticated, history]);

  // State
  const [isClicked, setClick] = useState(false);
  const [inputValue, updateInputValue] = useState({
    foodName: '',
    startDate: '',
    expiryDate: '',
    compartment: ''
  });
  const [isReadyPost, setIsReadyPost] = useState(false);
  const [didDataPost, setDidDataPost] = useState(false);

  const { foodName, startDate, expiryDate, compartment } = inputValue;

  const handleUpdate = e => {
    const { name, value } = e.target;

    updateInputValue(prev => ({ ...prev, [name]: value }));
  };

  const postData = async data => {
    const response = await axios.put(
      'http://localhost:8080/api/add-food',
      data
    );

    try {
      console.log({ response });
      setIsReadyPost(false);
      setClick(false);
      setDidDataPost(true);
    } catch (err) {
      console.log({ err });
      setIsReadyPost(false);
      setClick(false);
    }
  };

  const getData = async id => {
    const response = await axios.post('http://localhost:8080/api/get-food', id);

    try {
      const { data: { data }} = response; 
      console.log(data);
      dispatch({ 
        type: 'GET_FOOD', 
        freezer: data.freezer, 
        refrigerator: data.refrigerator
      });
      setDidDataPost(false);
    } catch (err) {
      console.log({ err });
      setDidDataPost(false);
    }
  };

  useEffect(() => {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}`}
    // }
    if (isReadyPost) {
      const dataToPost = {
        id: user.id,
        name: foodName,
        startTime: startDate,
        expireTime: expiryDate,
        compartment
      };

      postData(dataToPost);
    }
  }, [
    isReadyPost,
    inputValue,
    compartment,
    user.id,
    startDate,
    foodName,
    expiryDate
  ]);

  useEffect(() => {
    if (didDataPost) {
      getData({ id: user.id });
    }
  }, [didDataPost, user.id]);

  return (
    <div className="container container--main-content">
      <button
        id="add"
        className={isClicked ? 'btn btn-primary clicked' : 'btn btn-primary'}
        onClick={() => setClick(!isClicked)}>
        + Add Food
      </button>

      <Form className={isClicked ? 'add-food__form show' : 'add-food__form'}>
        <Input
          className="add-food__input-container"
          labelText="Food Name"
          id="foodName"
          name="foodName"
          inputValue={foodName}
          placeholder="Food name"
          onChange={handleUpdate}
        />

        <Input
          className="add-food__input-container"
          labelText="Date Cooked/Opened"
          id="startDate"
          name="startDate"
          inputValue={startDate}
          placeholder="Date food was opened or cooked"
          onChange={handleUpdate}
        />

        <Input
          className="add-food__input-container"
          labelText="Expiry Date"
          id="expiryDate"
          name="expiryDate"
          inputValue={expiryDate}
          placeholder="Days until food expires"
          onChange={handleUpdate}
        />

        <Input
          className="add-food__input-container"
          labelText="Compartment"
          id="compartment"
          name="compartment"
          inputValue={compartment}
          placeholder="Regriferator or freezer?"
          onChange={handleUpdate}
        />

        <button
          type="submit"
          className="btn btn-secondary"
          onClick={e => {
            e.preventDefault();
            setIsReadyPost(true);
          }}>
          Add
        </button>
      </Form>
      <ul>
        {user.freezer.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
        {user.refrigerator.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
