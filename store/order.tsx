'use client'
import { create } from "zustand";

const orderStore = (set: any, get: any) => ({

  cartProducts: [],
  customer: null,

  setCustomer: (customer: number) => {
    set((state:any) => ({
        customer: customer
    }));
  }
  
});

const pos = create(orderStore);

export default pos;