"use client"
import React, { useContext } from 'react'
import CartDetail from './cart-detail';
import { StateContext } from '../state/state';

const Cart = () =>
{
    const { cartItems } = useContext( StateContext );
    const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );


    return <CartDetail cartItems={cartItems} cartTotalPrice={cartTotalPrice.toFixed( 2 )} />;

}

export default Cart