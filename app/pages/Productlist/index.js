"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productlist = () =>
{
    // const products = [
    //     { id: 1, name: "product 1", price: 9.99 },
    //     { id: 2, name: "product 2", price: 19.99 },
    //     { id: 3, name: "product 3", price: 91.99 },
    //     { id: 4, name: "product 4", price: 92.99 },
    //     { id: 5, name: "product 5", price: 29.99 },
    // ]

    const [products, setProduct] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'https://fakestoreapi.com/products' )
            .then( response =>{
            setProduct( response.data )
            } )
            .catch( error =>
            {
                console.error(error)
            })
    }, [] )
    
    return (
        <div>
            <h1>
                Product List
            </h1>

            <ul>
                {products.map( ( product ) => (
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