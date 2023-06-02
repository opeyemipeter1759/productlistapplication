"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () =>
{
    const [products, setProducts] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( '' );
    const [filteredProducts, setFilteredProducts] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [itemsPerPage] = useState( 10 );
    const [sortOrder, setSortOrder] = useState( '' );
    const [isLoading, setIsLoading] = useState( true );

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice( indexOfFirstItem, indexOfLastItem );

    return (
        <div>
            <h1>Product List</h1>
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
                <div>
                    <ul>
                        {currentItems.map( ( product ) => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                <p>Price: ${product.price}</p>
                                <img src={product.image} alt={product.title} />
                            </li>
                        ) )}
                    </ul>
                    <div>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange( currentPage - 1 )}
                        >
                            Previous
                        </button>
                        <span>{currentPage}</span>
                        <button
                            disabled={currentPage === Math.ceil( filteredProducts.length / itemsPerPage )}
                            onClick={() => handlePageChange( currentPage + 1 )}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;