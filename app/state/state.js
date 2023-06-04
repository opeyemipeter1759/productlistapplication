// state.js
import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const StateContext = createContext();


const StateProvider = ( { children } ) =>
{
    const persistKey = "app state"
    const [cartItems, setCartItems] = useState( JSON.parse( localStorage[persistKey] || "[]" ) );

    useEffect( () =>
    {
        localStorage.setItem( persistKey, JSON.stringify( cartItems ) )
    }, [cartItems] );


    return (
        <StateContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
