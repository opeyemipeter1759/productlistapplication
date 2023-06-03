import React from "react";
import Productlist from "./product-list";

const Home = () =>
{
    return (
        <div className="container">
            <h1>
                Welcome to my productList page
            </h1>
            <Productlist/>
        </div>
    )
}

export default Home