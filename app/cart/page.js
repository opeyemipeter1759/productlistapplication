"use client"
// import React, { useContext } from 'react'
// import CartDetail from './cart-detail';
// import { StateContext } from '../state/state';

// const Cart = ({}) =>
// {
//     const { cartItems, setCartItems } = useContext( StateContext );
//     const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );
//     const handleRemoveFromCart = ( productId ) =>
//     {
//         const updatedCartItems = cartItems.filter( ( item ) => item.id !== productId );
//         setCartItems( updatedCartItems );
//     };

//     return <CartDetail cartItems={cartItems} cartTotalPrice={cartTotalPrice.toFixed( 2 )} handleRemoveFromCart={handleRemoveFromCart} />;

// }

// export default Cart

import React, { useContext, useState } from 'react';
import CartDetail from './cart-detail';
import { StateContext } from '../state/state';

const Cart = () =>
{
    const { cartItems, setCartItems } = useContext( StateContext );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [productIdToRemove, setProductIdToRemove] = useState( '' );

    const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );

    const handleRemoveFromCart = ( productId ) =>
    {
        setProductIdToRemove( productId );
        setIsModalOpen( true );
    };

    const handleConfirmation = () =>
    {
        const updatedCartItems = cartItems.filter( ( item ) => item.id !== productIdToRemove );
        setCartItems( updatedCartItems );
        setIsModalOpen( false );
    };

    const handleCancel = () =>
    {
        setIsModalOpen( false );
    };

    return (
        <>
            <CartDetail cartItems={cartItems} cartTotalPrice={cartTotalPrice.toFixed( 2 )} handleRemoveFromCart={handleRemoveFromCart} />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8">
                        <p className="text-xl font-bold mb-4">Remove Item</p>
                        <p className="mb-4">Are you sure you want to remove this item from the cart?</p>
                        <div className="flex justify-end">
                            <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancel}>
                                No
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleConfirmation}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
