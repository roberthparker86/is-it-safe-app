import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';

const MainContent = (props) => {

    const [ isClicked, setClick ] = useState(false);

    return (
        <div className='container container--main-content'>
            <button 
                id='add' 
                className={ (isClicked ? 'btn btn-primary clicked': 'btn btn-primary') } 
                onClick={() => setClick(!isClicked)}
            >
                + Add Food
            </button>

            <Form className={ (isClicked ? 'add-food__form show' : 'add-food__form')}>

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

                <button type='submit' className='btn btn-secondary'>Add</button>

            </Form>
        </div>
    )
};

export default MainContent;