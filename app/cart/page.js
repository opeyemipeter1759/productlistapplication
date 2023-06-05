"use client"

import React, { useContext, useState } from 'react';
import CartDetail from './cart-detail';
import { StateContext } from '../state/state';

const Cart = () =>
{
      // Retrieve cart items and setCartItems from the StateContext

    const { cartItems, setCartItems } = useContext( StateContext );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [productIdToRemove, setProductIdToRemove] = useState( '' );

      // Calculate the total price of the cart items
    const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );

      // Handle the removal of an item from the cart
    const handleRemoveFromCart = ( productId ) =>
    {
        setProductIdToRemove( productId );
        setIsModalOpen( true );
    };

      // Handle the confirmation of item removal
    const handleConfirmation = () =>
    {
        const updatedCartItems = cartItems.filter( ( item ) => item.id !== productIdToRemove );
        setCartItems( updatedCartItems );
        setIsModalOpen( false );
    };

      // Handle canceling item removal
    const handleCancel = () =>
    {
        setIsModalOpen( false );
    };

    return (
        <>
            {/* Render the CartDetail component */}
            <CartDetail cartItems={cartItems} cartTotalPrice={cartTotalPrice.toFixed( 2 )} handleRemoveFromCart={handleRemoveFromCart} />
            {/* Render the confirmation modal */}
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
