import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Form from './Form';
import Input from './Input';
import { ItemCard } from './ItemCard';
import { CompartmentToggle } from './CompartmentToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  setStatus,
  getRemainingTime,
  sortByTimeLeft
} from '../controllers/controllers';

const MainContent = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authStore = useSelector(store => store.auth);
  const userStore = useSelector(store => store.user);
  const isAuthenticated = useMemo(() => authStore.isAuthenticated, [authStore]);
  const currentLocation = useMemo(() => history.location.pathname, [history]);
  const user = useMemo(() => userStore, [userStore]);

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
  const [activeBtn, setActiveBtn] = useState('refrigerator');

  const { foodName, startDate, expiryDate, compartment } = inputValue;

  const handleUpdate = e => {
    const { name, value } = e.target;

    updateInputValue(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async data => {
    const response = await axios.post(
      'http://localhost:8080/api/delete-food',
      data
    );

    try {
      if (response.status === 200) {
        console.log(response.data.data);
        const { freezer, refrigerator } = response.data.data;

        freezer.sort((a, b) => sortByTimeLeft(a, b));
        refrigerator.sort((a, b) => sortByTimeLeft(a, b));

        dispatch({
          type: 'UPDATE_FOOD',
          freezer,
          refrigerator
        });
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const postData = useCallback(async data => {
    const response = await axios.put(
      'http://localhost:8080/api/add-food',
      data
    );

    try {
      console.log({ response });
      const { freezer, refrigerator } = response.data.data;

      freezer.sort((a, b) => sortByTimeLeft(a, b));
      refrigerator.sort((a, b) => sortByTimeLeft(a, b));

      dispatch({
        type: 'UPDATE_FOOD',
        freezer,
        refrigerator
      });

      setIsReadyPost(false);
      setClick(false);
      updateInputValue({});
    } catch (err) {
      console.log({ err });
      setIsReadyPost(false);
      setClick(false);
      updateInputValue({});
    }
  }, [setIsReadyPost, dispatch]); 

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
    expiryDate,
    postData
  ]);

  // useEffect(() => {
  //   const getData = async id => {
  //     const response = await axios.post(
  //       'http://localhost:8080/api/get-food',
  //       id
  //     );

  //     try {
  //       const {
  //         data: { data }
  //       } = response;
  //       data.freezer.sort((a, b) => sortByTimeLeft(a, b));
  //       data.refrigerator.sort((a, b) => sortByTimeLeft(a, b));
  //       dispatch({
  //         type: 'UPDATE_FOOD',
  //         freezer: data.freezer,
  //         refrigerator: data.refrigerator
  //       });
  //       setDidDataPost(false);
  //       updateInputValue({});
  //     } catch (err) {
  //       console.log({ err });
  //       setDidDataPost(false);
  //       updateInputValue({});
  //     }
  //   };

  //   if (didDataPost) {
  //     getData({ id: user.id });
  //   }
  // }, [didDataPost, user.id, dispatch]);

  return (
    <div className="container container--main-content">
      <button
        id="add"
        className={isClicked ? 'btn btn-primary' : 'btn btn-primary'}
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

      <CompartmentToggle activeBtn={activeBtn} setActiveBtn={setActiveBtn} />

      <section className="grid">
        {user[activeBtn] &&
          user[activeBtn].map(item => {
            const remainingTime = getRemainingTime(
              item.startTime,
              item.expireTime
            );
            const status = setStatus(remainingTime);

            return (
              <ItemCard
                id={item._id}
                key={item._id}
                status={status}
                remainingTime={remainingTime}
                name={item.name}
                handleDelete={handleDelete}
                user={user}
                compartment={activeBtn}
              />
            );
          })}
      </section>
    </div>
  );
};

export default MainContent;
