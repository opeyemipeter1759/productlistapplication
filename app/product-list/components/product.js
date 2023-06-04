import React, { useState } from 'react'
import Button from '@/app/components/button/button'


const Product = ( props ) =>
{
    const [showMore, setShowMore] = useState( false )
    const {product} = props
  return (
          <li className="px-7 py-8 bg-white  rounded-2xl" >
              <div className="w-full flex flex-col h-full ">
                  <div className="flex grow flex-col">
                      <div className="flex flex-col grow">
                          <div className="mx-auto my-0 mb-[10px]">
                              <img className=" max-w-full w-full h-[240px] object-contain" src={product.image} alt={product.title} />
                          </div>
                          <div className="grow mt-2 mb-[10px]">
                              <h1 className="text-base font-semibold antialiased mb-[10px]">{product.title}</h1>
                              <p className="text-sm antialiased text-left mb-[10px]	">
                                  {showMore ? product.description : product.description.substring( 0, 50 )}...
                              <a className="cursor-pointer text-[#0071e3]" onClick={() => setShowMore(!showMore)}>
                                      {showMore ? "Show Less" : "Show More"}
                                  </a>
                              </p>
                              <p className="my-3 font-semibold mb-[10px]">Price: ${product.price}</p>
                          </div>
                      </div>

                  </div>
                  <div className="mt-4 ">
                      <Button
                          onClick={() => props.handleAddToCart( product )}
                          disabled={props.isAddingToCart[product.id]}
                          text={props.isAddingToCart[product.id] ? 'Adding to Cart...' : 'Add to Cart'}
                  />
                  </div>
              </div>
          </li>
  )
}

export default Product