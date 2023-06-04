import { ChangeEvent } from 'react';

export const Pagination = ( props ) =>
{
    const {
        perPage = 8,
        total = 0,
        page = 1,
        pageCount = 1,
        hasPrevPage = false,
        hasNextPage = false,
        previousPage = null,
        nextPage = null,
    } = props;
    console.log(props);
    if ( total < 9 )
    {
        return null;
    }

    const {
        refresh = () => { },
        perPageItems = ['10', '100', '1000', 'all'],
    } = props;

    const handlePerPageSelect = ( event) =>
    {
        const value = event.target.value;
        if ( value === 'all' )
        {
            return refresh( { page: 1, perPage, all: true } );
        }
        const numberOfPages = Math.ceil( total / +value );
        const newPage = page > numberOfPages ? numberOfPages : page;

        refresh( { page: newPage, perPage: value } );
    };

    return (
        <div className="flex justify-around items-center my-5">
            <div className=" text-base  font-normal ">
                <span className="text-[#6d7a98] text-base" >Showing</span> Page {page} of {pageCount}
            </div>

            <div className="flex items-center text-base  font-normal">
                <span>Items per page: </span>
                    <select onChange={handlePerPageSelect}  className="p-2 flex items-center justify-betwen bg-[#fff] rounded w-full outline-none">
                        <option selected value="8">8</option>
                        <option value="16">16</option>
                        <option value="32">32</option>
                        <option value="100">100</option>
                        <option value="all">all</option>
                    </select>
            </div>

            <div className="flex items-center px-2 gap-3">
                <button
                    disabled={!hasPrevPage}
                    onClick={() => refresh( { page: previousPage, perPage } )}
                    className="text-[#6d7a98] text-base cursor-pointer"
                >
                    Prev
                </button>
                <button
                    onClick={() => refresh( { page: 1, perPage } )}
                    disabled={page === 1}
                    className={page !== 1 ? " " : "text-[#0071e3] bg-[#fff] text-base px-2"}
                >
                    1
                </button>
                {page - 3 > 0 && <button>...</button>}
                {page === pageCount && pageCount > 3 && (
                    <button onClick={() => refresh( { page: page - 2, perPage } )}>
                        {page - 2}
                    </button>
                )}
                {page - 2 > 0 && page !== pageCount - 2 && (
                    <button onClick={() => refresh( { page: page - 1, perPage } )}>
                        {page - 1}
                    </button>
                )}
                {page - 1 > 0 && page + 1 <= pageCount && (
                    <button
                    className="text-[#0071e3] bg-[#fff] text-base px-2"
                    
                        disabled>{page}</button>
                )}
                {page + 2 <= pageCount && page !== 3 && (
                    <button onClick={() => refresh( { page: page + 1, perPage } )}>
                        {page + 1}
                    </button>
                )}
                {page === 1 && pageCount > 3 && (
                    <button onClick={() => refresh( { page: 3, perPage } )}>3</button>
                )}
                {page + 3 <= pageCount && <button>...</button>}
                {pageCount !== 1 && (
                    <button
                        onClick={() => refresh( { page: pageCount, perPage } )}
                        disabled={page === pageCount}
                        className={page !== pageCount ? " " : "text-[#0071e3] bg-[#fff] text-base px-2"}
                    >
                        {pageCount}
                    </button>
                )}
                <button
                    className="text-[#6d7a98] text-base cursor-pointer"
                    onClick={() => refresh( { page: nextPage, perPage } )}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};