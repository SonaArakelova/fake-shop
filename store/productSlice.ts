//store mej ashxatum enq toolkitov
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";

import {Product} from '@/types';

const BASE_URL = 'https://fakestoreapi.com/products';

type ProductState = {
  list : Product[];
  current: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null

};

const initialState: ProductState = {
  list: [],
  current: null,
  status: 'idle',
  error: null
}

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async()=>{
    const res = await axios.get<Product[]>(BASE_URL);
    const data = res.data;
    return data;

  }
);


export const fetchProductById = createAsyncThunk<Product, number>(
  //product inch em ogtagortsum, number inch em veradardznum
  'products/fetchProductsById',
  async(id)=>{
    const res = await axios.get<Product>(`${BASE_URL}/${id}`);
    const data = res.data;
    return data;
  }
);

export const createProduct = createAsyncThunk<Product, Omit<Product, 'id'>>(
  //omit baci
  'products/createProduct',
  async(newProduct)=>{
    const res = await axios.post(BASE_URL, newProduct);
    const data = res.data;
    return data;
  }

)


export const updateProduct = createAsyncThunk<Product, {id:number, title:string}>(
  'products/updateProduct',
  async(product)=>{
    const res = await axios.put<Product>(`${BASE_URL}/${product.id}`, product);
    const data = res.data;
    return data;
  }
);


export const deleteProduct = createAsyncThunk<number, number>(
  'products/deleteProducts',
  async(id)=>{
    const res = await axios.delete(`${BASE_URL}/${id}`); //sending request
    const statusCode = res.status; //response body
    return statusCode;
  }
);


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers:{
    clearCurrent(state){
      state.current = null
    }
  },
  //bolor funkcianer@ irar tak grelu poxaren use extrareducer
  extraReducers:(builder)=>{
    builder
    //fetchProducts
    .addCase(fetchProducts.pending, (state)=>{
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>)=>{
      state.status = 'succeeded';
      state.list = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action)=>{
    state.status = 'failed';
    state.error= action.error.message ?? null;
  })
  //fetchById
  .addCase(fetchProductById.pending, (state)=>{
    state.status = 'loading';
  })
  .addCase(fetchProductById.fulfilled, (state,action:PayloadAction<Product>)=>{
    state.status = 'succeeded';
    state.current = action.payload;
    //action.payload is the data returned from fetchProductById thunk.
  })
  .addCase(fetchProductById.rejected, (state, action)=>{
    state.status = 'failed';
    state.error = action.error.message ??  null;

    //nullish  ?? only checks for null or undefined.
  })
  //create
  .addCase(createProduct.pending, (state)=>{
    state.status = 'loading';
  })
  .addCase(createProduct.fulfilled, (state, action:PayloadAction<Product>)=>{
    state.status = 'succeeded';
    state.list.push(action.payload);
  })
  .addCase(createProduct.rejected, (state,action)=>{
    state.status = 'failed';
    state.error = action.error.message ?? null;
  })
  //update
  .addCase(updateProduct.pending, (state)=>{
    state.status ='loading';
  })
  .addCase(updateProduct.fulfilled, (state, action)=>{
    state.status = 'succeeded';
    state.list = state.list.map(p => p.id === action.payload.id ? action.payload : p) ;
    if(state.current?.id === action.payload.id){
      state.current = action.payload;
    }
  })
  .addCase(updateProduct.rejected, (state,action)=>{
    state.status = 'failed';
    state.error = action.error.message ?? null
  })
  //delete
  .addCase(deleteProduct.fulfilled, (state,action: PayloadAction<number>)=>{
    state.list = state.list.filter(p => p.id !== action.payload);
    if(state.current?.id === action.payload){
      state.current = null;
    }
  })


  }

});


export const { clearCurrent }  = productSlice.actions;

export default productSlice.reducer;







