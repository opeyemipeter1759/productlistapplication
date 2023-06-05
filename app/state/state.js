// state.js
/**
This file contains the implementation of a state management context using React's Context API.
*/


import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const StateContext = createContext();


const StateProvider = ( { children } ) =>
{
      // Define the key for local storage and check if running in the browser
    const persistKey = "app state"
    const isBrowser = typeof window !== 'undefined';

      // State variable for storing cart items
    const [cartItems, setCartItems] = useState( isBrowser ? JSON.parse( localStorage[persistKey] || "[]" ) : [] );

    useEffect( () =>
    {
            // Update local storage when cartItems state changes
        localStorage.setItem( persistKey, JSON.stringify( cartItems ) )
    }, [cartItems] );


    return (
        <StateContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
