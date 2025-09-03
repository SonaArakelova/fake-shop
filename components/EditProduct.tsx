"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCurrent, fetchProductById, updateProduct } from "@/store/productSlice";





export  function EditProduct({id}:{id:string}) {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const {current, status} = useAppSelector(state => state.products);
    const [title, setTitle] = useState('')

    useEffect(()=>{
        //dispatch is a function that sends an action 
        // to your reducer function.
        dispatch(fetchProductById(Number(id)));

        return ()=>{
            dispatch(clearCurrent())
        }

    }, [id]);

    useEffect (()=>{
        if(current){
        setTitle(current.title);
        }

    }, [current]);

    if(status === 'loading' || !current) return <p>Loading...</p>;

    const handleSave = async () => {
       const res = await dispatch(updateProduct({id: current?.id, title})).unwrap();
       console.log(res);
       
       router.push(`/products/${current.id}`)

    }



  return (
     <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 space-y-6 mt-[150px]">
      <div>
        <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 transition-colors"
      >
        Save
      </button>
    </div>
  )
}
