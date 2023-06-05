//This component renders a list of products with pagination and search functionality.

import React, { useEffect, useState, useContext } from 'react';
import Product from './components/product';
import { Pagination } from '../components/pagination/pagination';
import useProduct from '../hooks/useProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';


import { StateContext } from '../state/state';
import Link from 'next/link';


const ProductList = () =>
{
    // State variables
    const [searchTerm, setSearchTerm] = useState( '' );
    const [filteredProducts, setFilteredProducts] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [itemsPerPage, setItemsPerPage] = useState( 8 );
    const [sortOrder, setSortOrder] = useState( '' );
    const { cartItems, setCartItems } = useContext( StateContext );
    const [isAddingToCart, setIsAddingToCart] = useState( {} );

    // Fetching products using the useProduct hook
    const { products, isLoading } = useProduct();



// Effect for filtering products based on the search term
    useEffect( () =>
    {
        const filtered = products.filter( ( product ) =>
            product.title.toLowerCase().includes( searchTerm.toLowerCase() )
        );
        setFilteredProducts( filtered );
        setCurrentPage( 1 );
    }, [products, searchTerm] );

    // Effect for sorting products based on the sort order
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


// Event handler for search input
    const handleSearch = ( event ) =>
    {
        setSearchTerm( event.target.value );
    };


    // Event handler for sorting select input
    const handleSort = ( event ) =>
    {
        setSortOrder( event.target.value );
    };

    // Event handler for page change
    const handlePageChange = ( page ) =>
    {
        setCurrentPage( page );
    };


    // Event handler for adding a product to the cart
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


// Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice( indexOfFirstItem, indexOfLastItem );

    const cartItemCount = cartItems.length;

  
    return (
        <div >
            <div className="flex justify-end gap-4 py-5"> 
                    <div className="flex w-full items-center py-2  px-5 bg-white rounded xxs:w-[90%] md:w-[30%]">
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
                        <div>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm absolute -top-[4px] xs:-top-[0px] right-0">
                            {cartItemCount}
                        </span>
                        </div>
                    )}
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-3xl" />
                   
                </Link>


            </div>
             

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                    <div >
                        <div className="flex justify-end">
                        <div className="h-fit-content w-[240px] border-[#c9c9c9] bg-white mb-4" >
                        <select value={sortOrder} onChange={handleSort} className="px-[2rem] py-[1rem]  outline-transparent text-base bg-white	">
                            <option value="">Sort by Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                            </select>
                        </div>

                        </div>
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