import React, { useEffect, useState, useContext } from 'react';
import Product from './components/product';
import { Pagination } from '../components/pagination/pagination';
import useProduct from '../hooks/useProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';


import CartDetail from '../cart/cart-detail';
import { StateContext } from '../state/state';
import Link from 'next/link';


const ProductList = () =>
{
    const [searchTerm, setSearchTerm] = useState( '' );
    const [filteredProducts, setFilteredProducts] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [itemsPerPage, setItemsPerPage] = useState( 8 );
    const [sortOrder, setSortOrder] = useState( '' );
    const { cartItems, setCartItems } = useContext( StateContext );
    const [isCartOpen, setIsCartOpen] = useState( false );
    const [isAddingToCart, setIsAddingToCart] = useState( {} );
    const { products, isLoading } = useProduct();
    const [showCartPage, setShowCartPage] = useState( false );




    const handleCartButtonClick = () =>
    {
        setIsCartOpen( true );
    };

    const handleHideCart = () =>
    {
        setIsCartOpen( false );
    };

    const handleShowCartPage = () =>
    {
        setShowCartPage( true );
    };

    const handleHideCartPage = () =>
    {
        setShowCartPage( false );
    };
    

    useEffect( () =>
    {
        const filtered = products.filter( ( product ) =>
            product.title.toLowerCase().includes( searchTerm.toLowerCase() )
        );
        setFilteredProducts( filtered );
        setCurrentPage( 1 );
    }, [products, searchTerm] );

    useEffect( () =>
    {
        const sorted = [...filteredProducts].sort( ( a, b ) =>
        {
            if ( sortOrder === 'asc' )
            {
                return a.price - b.price;
            } else if ( sortOrder === 'desc' )
            {
                return b.price - a.price;
            }
            return 0;
        } );
        setFilteredProducts( sorted );
        setCurrentPage( 1 );
    }, [sortOrder] );

    const handleSearch = ( event ) =>
    {
        setSearchTerm( event.target.value );
    };

    const handleSort = ( event ) =>
    {
        setSortOrder( event.target.value );
    };

    const handlePageChange = ( page ) =>
    {
        setCurrentPage( page );
    };

    const handleAddToCart = async ( product ) =>
    {
        setIsAddingToCart( ( prevState ) => ( {
            ...prevState,
            [product.id]: true
        } ) );

        try
        {
            // Simulating an asynchronous API call
            await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );

            setCartItems( ( prevCartItems ) => [...prevCartItems, product] );
        } catch ( error )
        {
            console.error( error );
        }

        setIsAddingToCart( ( prevState ) => ( {
            ...prevState,
            [product.id]: false
        } ) );
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice( indexOfFirstItem, indexOfLastItem );

    const cartItemCount = cartItems.length;

  
    return (
        <div >
            <h1>Product List</h1>
            <div className="flex justify-between py-5"> 
                    <div className="flex w-full items-center py-2  px-5 bg-white rounded xxs:w-[70%] md:w-[30%]">
                        <FontAwesomeIcon icon={faSearch} className="mr-2 text-xl" />
                    <input
                        type="text"
                        placeholder="Search for Products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="text-base outline-none h-[2.75rem] border-transparent w-[100%] "
                    />
                    </div>
            
                <Link 
                    className="flex items-center relative focus:outline-none"
                    href="/cart"
                >
                    {cartItemCount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm absolute -top-[4px] xs:-top-[0px] right-0">
                            {cartItemCount}
                        </span>
                    )}
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-3xl" />
                   
                </Link>


            </div>
            {isCartOpen && (
                <CartDetail cartItems={cartItems} handleHideCart={handleHideCart} cartTotalPrice={cartTotalPrice.toFixed( 2 )} />
            )}     

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="">

                        <select value={sortOrder} onChange={handleSort}>
                            <option value="">Sort by Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    <ul className=" grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                        {currentItems.map( ( product ) => (
                            <Product
                                product={product}
                                key={product.id}
                                handleAddToCart={handleAddToCart}
                                isAddingToCart={isAddingToCart}
                            />
                        ) )}
                    </ul>
                    <div>
                            
                            <Pagination
                                total={ filteredProducts.length}
                                perPage={itemsPerPage}
                                page={currentPage}
                                pageCount={Math.ceil(filteredProducts.length/itemsPerPage)}
                                hasPrevPage={currentPage > 1}
                                hasNextPage={currentPage + 1 <= Math.ceil( filteredProducts.length / itemsPerPage )}
                                previousPage={currentPage - 1}
                                nextPage={currentPage + 1}
                                refresh={({page, perPage}) =>
                                {
                                    handlePageChange( page || 1 )
                                    setItemsPerPage(perPage==="all" ? filteredProducts.length: perPage)
                                }}
                            />
                    </div>
                </div>
            )}
         
        </div>
    );
};

export default ProductList;