import React from 'react';
import Form from './Form';
import Input from './Input';

const MainContent = (props) => {

    return (
        <div className='container container--main-content'>
            <button id='add' className='btn-primary' onClick={function () {
                console.log(this);
            }}>
                + Add Food
            </button>

            <Form className='add-food__form'>

                <Input
                    className='add-food__input-container'
                    labelText='Food Name'
                    id='food-name'
                    name='food-name'
                    inputValue=''
                    placeholder='Food name'
                />

                <Input
                    className='add-food__input-container'
                    labelText='Date Cooked/Opened'
                    id='start-date'
                    name='start-date'
                    inputValue=''
                    placeholder='Date food was opened or cooked'
                />
                
                <Input
                    className='add-food__input-container'
                    labelText='Expiry Date'
                    id='expiry-date'
                    name='expiry-date'
                    inputValue=''
                    placeholder='Days until food expires'
                />
                
                <Input
                    className='add-food__input-container'
                    labelText='Compartment'
                    id='compartment'
                    name='compartment'
                    inputValue=''
                    placeholder='Regriferator or freezer?'
                />

                <button type='submit' className='btn-secondary'>Add</button>

            </Form>
        </div>
    )
};

export default MainContent;