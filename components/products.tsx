'use client';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productSlice";
import Link from "next/link";
import Image from "next/image";

import noimg from '@/public/noimg.png';


export  function Products() {

  const dispatch = useAppDispatch();
  const{list, status,error} = useAppSelector(state=> state.products);

  useEffect(()=>{
    if (status ==='idle'){
      dispatch(fetchProducts())
    }
  }, [dispatch]); //? status


  if(status === 'loading') return <p>Loading ...</p>
  if(status === 'failed') return <p>Error:{error}</p>



  return (
    <div className="container mx-auto p-6">
    
       <ul className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {list.map(p=> <li key ={p.id} className="flex flex-col justify-center items-center shadow-md p-4">
          <Link href={`/products/${p.id}`}>
            <div className="relative w-[200px] h-[200px] mb-5  rounded overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                priority
                placeholder={'blur'}
                blurDataURL={noimg.blurDataURL}
                className="object-contain inset-0"

              />
            </div>

          <div className="italic text-lg">{p.title}</div>
          <div className="font-bold  text-indigo-500"> Price: ${p.price}</div>

            </Link>
        </li>)}
        </ul>
       
       
       </div>
  )
}
