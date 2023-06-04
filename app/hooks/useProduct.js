import {useEffect, useState} from 'react'
import axios from 'axios';

const useProduct = () =>
{
    const [products, setProducts] = useState( [] );
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

    return {
        products,
        isLoading
  }
}

export default useProduct