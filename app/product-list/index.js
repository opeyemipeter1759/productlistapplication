import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './components/product';
import { Pagination } from '../components/pagination/pagination';

const ProductList = () =>
{
    const [products, setProducts] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( '' );
    const [filteredProducts, setFilteredProducts] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [itemsPerPage, setItemsPerPage] = useState( 8 );
    const [sortOrder, setSortOrder] = useState( '' );
    const [isLoading, setIsLoading] = useState( true );
    const [cartItems, setCartItems] = useState( [] );
    const [isAddingToCart, setIsAddingToCart] = useState( {} );

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            setIsLoading( true );
            try
            {
                const response = await axios.get( 'https://fakestoreapi.com/products' );
                setProducts( response.data );
                setIsLoading( false );
            } catch ( error )
            {
                console.error( error );
                setIsLoading( false );
            }
        };

        fetchData();
    }, [] );

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
    const cartTotalPrice = cartItems.reduce( ( total, item ) => total + item.price, 0 );

    return (
        <div >
            <h1>Product List</h1>
            {/* <Product /> */}
            <div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={sortOrder} onChange={handleSort}>
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="">


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
                        {/* <button 
                            disabled={currentPage  <=1 }
                            onClick={() => handlePageChange( currentPage - 1 )}
                        >
                            Previous
                        </button>
                        <span>{currentPage}</span>
                        <button
                            disabled={indexOfLastItem >= filteredProducts.length}
                            onClick={() => handlePageChange( currentPage + 1 )}
                        >
                            Next
                            </button> */}
                            
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
            <h2>Shopping Cart</h2>
            <p>Total Items: {cartItemCount}</p>
            <p>Total Price: ${cartTotalPrice.toFixed( 2 )}</p>
            <ul>
                {cartItems.map( ( item ) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Price: ${item.price}</p>
                    </li>
                ) )}
            </ul>
        </div>
    );
};

export default ProductList;