
import React from 'react'
import {ProductDetail} from '@/components/ProductDetail';


type Params = {
  params: Promise<{id: string}>
}

export default async function ProductPage({params}: Params) {
  const {id}= await params;


  return (
    <div>
      <h1 className='p-10 text-6xl italic font-bold text-center text-indigo-500 bg-fuchsia-50 '>Product{id} </h1>


    <ProductDetail id={id}/>
    </div>
  )
}
