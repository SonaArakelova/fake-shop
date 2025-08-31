 'use client'

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
//redux tvela 2 hook ashxatelu hamar 1. popoxakani hamar 2.funkcianeri

import { decrement, increment } from '@/store/counterSlice'

export function Counter() {
    //mer popoxakann e 
 const count = useAppSelector(state => state.counter.value)

  const dispatch = useAppDispatch()
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          //kanchum enq dispachov reduxi funkcianer@
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}