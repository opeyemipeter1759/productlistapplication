import React from 'react'

const Productlist = () =>
{
    const products = [
        { id: 1, name: "product 1", price: 9.99 },
        { id: 2, name: "product 2", price: 19.99 },
        { id: 3, name: "product 3", price: 91.99 },
        { id: 4, name: "product 4", price: 92.99 },
        { id: 5, name: "product 5", price: 29.99 },


    ]
    return (
        <div>
            <h1>
                Product List
            </h1>

            <ul>
                {products.map( ( product ) => (
                    <li key={product.id}>
                        <h3>
                            {product.name}
                        </h3>
                        <p>Price : ${ product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Productlist