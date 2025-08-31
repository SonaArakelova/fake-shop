//import { Counter } from "@/components/counter";
// import { Products } from "@/components/products";
import Link from "next/link";




export default function HomePage() {
  return (
<div className="min-h-screen w-full bg-fuchsia-50 flex items-center justify-center">
     <div className="flex flex-col items-center justify-center ">
      <h1 className='p-8 text-6xl  font-bold text-center text-indigo-500 '>
        Welcome to Fake Store Shop</h1>
        <Link href={`/products/`}
        className=" text-4xl  font-bold text-center text-indigo-500 ">Click Here!
        </Link>
     </div>

     {/* <Products/> */}
     {/* <Counter/> */}
    </div>
  );
}
