import React from 'react';
const CartDetail = ( { cartItems, cartTotalPrice } ) =>
{
    
    return (
        <div className=" conatiner mx-auto">
            <div className="bg-white rounded-lg p-8  w-full">
                <div className="flex justify-between items-center  ">
                    <p className="text-2xl font-extrabold">
                    Your  Cart
                    </p>
            </div>

            {cartItems.length > 0 ? (
                <>
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map( ( item ) => (
                            <li key={item.id} className="py-2">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-12 h-12 mr-4" />
                                    <div>
                                        <p className="text-lg font-medium">{item.title}</p>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <p className="mr-4">Quantity: {item.quantity}</p>
                                    <p className="text-gray-500">Total: ${item.price * item.quantity}</p>
                                </div>
                            </li>
                        ) )}
                    </ul>

                    <div className="mt-4">
                        <p className="text-lg font-medium">Total Price: ${cartTotalPrice}</p>
                    </div>
                </>
            ) : (
                <p className="text-lg">Your cart is empty.</p>
            )}
            </div>

        </div>


    );
};

export default CartDetail;
