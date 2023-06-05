
import Link from 'next/link';

const CartDetail = ( { cartItems, cartTotalPrice, handleRemoveFromCart } ) =>
{
    return (
        <div className="container mx-auto mt-5">
            <div className="bg-white rounded-lg p-8 w-full">
                <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map( ( item ) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-gray-200"
                            >
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <div className="w-16 h-16 overflow-hidden rounded mr-4">
                                        <img src={item.image} alt={item.title} className="w-[40px] h-[40px] object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleRemoveFromCart( item.id )}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) )}
                        <div className="flex items-center justify-between mt-6">
                            <h4 className="text-lg font-semibold">Total Price:</h4>
                            <p className="text-lg font-semibold">${cartTotalPrice}</p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Link  href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default CartDetail;
