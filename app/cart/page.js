"use client"
import React, { useContext } from 'react'
import CartDetail from './cart-detail';
import { StateContext } from '../state/state';

const Cart = ({setCartItems}) =>
{
    const { cartItems } = useContext( StateContext );
    const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );
    const handleRemoveFromCart = ( productId ) =>
    {
        const updatedCartItems = cartItems.filter( ( item ) => item.id !== productId );
        setCartItems( updatedCartItems );
    };

    return <CartDetail cartItems={cartItems} cartTotalPrice={cartTotalPrice.toFixed( 2 )}  />;

}

export default Cart