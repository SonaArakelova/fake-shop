'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrent, deleteProduct, fetchProductById } from '@/store/productSlice';
import { useRouter } from 'next/navigation';
//import { Rating } from "@/components/Rating"; 

import Image from 'next/image';

import noimg from '@/public/noimg.png';

export function ProductDetail({id}: {id:string}) {
    const dispatch = useAppDispatch();
    const {current, status,error} = useAppSelector(state=>state.products);
    const router = useRouter();

    useEffect(()=>{
       dispatch(fetchProductById(Number(id)));

       return ()=>{ dispatch(clearCurrent())}

    },[id, dispatch]);
    if(status === 'loading') return <p>Loading ... </p>
    if(status === 'failed') return <p>Error:{error}</p>
    if(status === 'succeeded' && !current) return <p> No Result</p>
    if(!current) return;


    const handleDelete = async ()=>{
            const statusCode = await dispatch(deleteProduct(current.id)).unwrap()//hanum enq henc mer patasxan@
            console.log(statusCode);
            router.push('/products')
        }
    

  return (
    <div className="OneProductPage w-full p-6 lg:px-12 bg-white">
        <h1 className="text-center text-3xl sm:text-4xl text-blue-950 font-bold mb-10">{current.title}</h1>

    

          <div className="flex flex-col lg:flex-row gap-20 p-10">
          <div className="w-full lg:w-1/2 shadow-md  flex flex-col items-center">
         
       
            <Image
                src={current && current.image ? current.image: noimg}
                alt={current.title}
                width={300}
                height={300}
                priority ={false}
                placeholder={'blur'}
                blurDataURL={noimg.blurDataURL}
                className="object-contain inset-0"
                quality={100}
                />
        </div>

        <div className="w-full lg:w-1/2 p-9">
          <p className=" italic text-2xl ">
            {current.description}
          </p>

          <div className="text-start mt-5 ">
          <p className="mb-2"> <span className="font-semibold"> Category: </span> {current.category}</p>
          <p className="mb-2 font-bold">Price: <span className="text-red-500">${current.price}</span></p>
                    {/* error */}
          {/* <div className="mb-2">
            Rating: <Rating rate={current.rating.rate} /> ({current.rating.count})
          </div> */} 
          </div>
        </div>
      </div>
      <div className='flex justify-center text-center gap-4'>
        <button 
         className="px-4 py-2 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-500/80 transition-colors"         
         onClick={()=>router.push(`/products/${id}/edit`)}>Edit</button>
        <button
         className="px-4 py-2 rounded  bg-indigo-500 text-white font-semibold hover:bg-indigo-500/80 transition-colors"
         onClick={handleDelete} >Delete</button>

      </div> 


    </div>
  )
}




        