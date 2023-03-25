import React, { 
  useCallback, 
  useEffect, 
  useMemo, 
  useState 
} from 'react';
import Form from './Form';
import Input from './Input';
import SelectInput from './SelectInput';
import { ItemCard } from './ItemCard';
import { CompartmentToggle } from './CompartmentToggle';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  setStatus,
  getRemainingTime,
  sortByTimeLeft
} from '../controllers/controllers';

const MainContent = props => {
  const dispatch = useDispatch();
  //stores
  const userStore = useSelector(store => store.user);

  // State
  const [isClicked, setClick] = useState(false);

  const inputDefaultValue = {
    foodName: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    expiryDate: ''
  };
  const [inputValue, updateInputValue] = useState(inputDefaultValue),
    [selectValue, updateSelectValue] = useState('');

  const [isReadyPost, setIsReadyPost] = useState(false);
  const [displayedCompartment, setDisplayedCompartment] = useState('refrigerator');

  // Memoized variables
  const user = useMemo(() => userStore, [userStore]),
    dataForPost = useMemo(() => ({
      compartment: selectValue.toLowerCase(),
      ...inputValue
    }),[selectValue, inputValue ]);

  const getUser = async () => {
    const apiUrl = 'http://localhost:8080/api/';

    const { data } = await axios.get(`${apiUrl}user`);

    if (data) {
      dispatch({
        type: 'LOGIN',
        isAuthenticated: true,
        user: data.user
      });
    }  
  };

  const { foodName, startDate, expiryDate } = inputValue;

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
      updateInputValue(inputDefaultValue);
    } catch (err) {
      console.log({ err });
      setIsReadyPost(false);
      setClick(false);
      updateInputValue(inputDefaultValue);
    }
  // eslint-disable-next-line
  }, [setIsReadyPost, dispatch]);

  useEffect(() => {
    if (isReadyPost) {
      console.log('%cData To Post', 'color: aquamarine', dataForPost, typeof dataForPost.expiryDate, typeof dataForPost.startDate );
      postData(dataForPost);      
    }
  }, [
    isReadyPost,
    inputValue,
    dataForPost,
    selectValue,
    postData,
    user
  ]);

  useEffect(() => getUser(), []);

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
          type="date"
          className="add-food__input-container"
          labelText="Date Cooked/Opened"
          id="startDate"
          name="startDate"
          inputValue={startDate}
          placeholder="Date food was opened or cooked"
          onChange={handleUpdate}
        />

        <Input
          type="date"
          className="add-food__input-container"
          labelText="Expiry Date"
          id="expiryDate"
          name="expiryDate"
          inputValue={expiryDate}
          placeholder="Days until food expires"
          onChange={handleUpdate}
        />

        <SelectInput updateSelectValue={updateSelectValue} selectValue={selectValue} />

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

      <CompartmentToggle displayedCompartment={displayedCompartment} setDisplayedCompartment={setDisplayedCompartment} />

      <section className="grid">
        {user[displayedCompartment] &&
          user[displayedCompartment].map(item => {
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
                compartment={displayedCompartment}
              />
            );
          })}
      </section>
    </div>
  );
};

export default MainContent;
