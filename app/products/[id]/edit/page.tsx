import {EditProduct} from "@/components/EditProduct";

type Params = {
  params:
   Promise<{id:string}>
};

export default async function EditProductPage({params}: Params) {
  //props: Params -we do destructuring so we use it shorter { params }: Params
  //URl ic id vercnelu hamar

   // I only care about the params part of the props. Now I can use params.id.
   //we dont have id directly so we do destruct
  // Destructure the id from the params

  const {id} = await params;


  return (
    <div>
       <h1 className='p-8 text-6xl  font-bold text-center text-indigo-500  bg-fuchsia-50'>
        Edit Product</h1>

        <EditProduct id = {id}/>
      </div>
  )
}
