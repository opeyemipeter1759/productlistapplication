"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productlist = () =>
{
    const [products, setProduct] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( "" )
    const [filteredProducts, setFilteredProducts] = useState( [] )

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



    return (
        <div>
            <h1>
                Product List
            </h1>
            <input type="text" placeholder="search product" value={searchTerm} onChange={handleSearch} />
            <ul>
                {filteredProducts.map( ( product ) => (
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