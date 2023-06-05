import {useEffect, useState} from 'react'
import axios from 'axios';

const useProduct = () =>
{
      // State variables for storing products and loading status
    const [products, setProducts] = useState( [] );
    const [isLoading, setIsLoading] = useState( true );


    useEffect( () =>
    {
            // Function to fetch data from the API
        const fetchData = async () =>
        {
            setIsLoading( true );
            try
            {
                 // Make API request to retrieve products
                const response = await axios.get( 'https://fakestoreapi.com/products' );
                setProducts( response.data );
                setIsLoading( false );
            } catch ( error )
            {
                console.error( error );
                setIsLoading( false );
            }
        };

        //fetchData();Call the fetchData function when the component mounts
        fetchData(); 
    }, [] );

    return {
        products, //return the products state
        isLoading // return the loading state
  }
}

export default useProduct