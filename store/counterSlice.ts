import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

// Define a type for the slice state
//typn e voroshum interfaceov kancnenq da
export interface CounterState {
  value: number
}

// Define the initial state using that type
//skzbnakan arjeq value number tipi 0
const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({ //funkciayi mutqin talis enq es mets obj-n
  name: 'counter',// anun uni
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: { //funkcia e 
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    //ete kanchenq funkcian incrementByAmount(5) ayd arjeq@ veragrum e PayloadActionin
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
      //state metsacrec 5-ov
    }
  }
})



export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer

