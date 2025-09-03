'use client';

import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { createProduct } from "@/store/productSlice";


export function NewProductForm() {
  
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
  


    const handleSumbit = async(e: React.FormEvent)=>{
        e.preventDefault();

        const res = await dispatch(createProduct({...product, price: parseFloat(product.price)})).unwrap();
        console.log(res);
        router.push('/products');
    };


    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setProduct({...product, [e.target.name]: e.target.value.trim()})
    }


    return (
   <form onSubmit={handleSumbit} className="max-w-xl mx-auto bg-white shadow-md rounded p-8 space-y-6 mt-[50px]">
  <h2 className="text-3xl font-bold text-indigo-500 text-center"> Form</h2>

  <div >
    <label className="block text-gray-700 font-semibold mb-1">Product Title</label>
    <input
      type="text"
      name="title"
      value={product.title}
      onChange={changeHandler}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>

  <div>
    <label className="block text-gray-700 font-semibold mb-1">Product Price</label>
    <input
      type="text"
      name="price"
      value={product.price}
      onChange={changeHandler}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>

  <div>
    <label className="block text-gray-700 font-semibold mb-1">Product Description</label>
    <input
      type="text"
      name="description"
      value={product.description}
      onChange={changeHandler}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>

   <div>
    <label className="block text-gray-700 font-semibold mb-1">Product Category</label>
    <input
      type="text"
      name="category"
      value={product.category}
      onChange={changeHandler}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>

  <div>
    <label className="block text-gray-700 font-semibold mb-1">Product Image</label>
    <input
      type="text"
      name="image"
      value={product.image}
      onChange={changeHandler}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 transition-colors"
  >
    CREATE </button>
               
</form>

  )
}