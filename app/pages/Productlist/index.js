"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productlist = () =>
{
    const [products, setProduct] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( "" );
    const [filteredProducts, setFilteredProducts] = useState( [] );
    const [sortOrder, setSortOrder] = useState( '' );

    useEffect( () =>
    {
        axios.get( 'https://fakestoreapi.com/products' )
            .then( response =>
            {
                setProduct( response.data )
            } )
            .catch( error =>
            {
                console.error( error )
            } )
    }, [] )

    const handleSearch = ( e ) =>
    {
        const searchTerm = e.target.value
        setSearchTerm( searchTerm )

        const filteredProducts = products.filter( product => product.title.toLowerCase().includes( searchTerm.toLowerCase() ) )

        setFilteredProducts( filteredProducts );
    }
    const handleSort = ( e ) =>
    {
        setSortOrder( e.target.value );
    };
    const sortedProducts = [...filteredProducts].sort( ( a, b ) =>
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



    return (
        <div>
            <h1>
                Product List
            </h1>
            <div className="">
            <input type="text" placeholder="search product" value={searchTerm} onChange={handleSearch} />
                <select value={sortOrder} onChange={handleSort}>
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
            <ul>
                {sortedProducts.map( ( product ) => (
                    <li key={product.id}>
                        <h3>
                            {product.title}
                        </h3>
                        <p>Price : ${product.price}</p>
                        <img src={product.image} alt={product.title} />
                    </li>
                ) )}
            </ul>
        </div>
    )
}

export default Productlist