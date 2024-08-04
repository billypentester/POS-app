'use client'
import { create } from "zustand";

const posStore = (set: any, get: any) => ({

  products: [],
  customers: [],

  addProducts: (products: any) => {
    set((state:any) => ({
      products: products
    }));
  },

  addCustomers: (customers: any) => {
    set((state:any) => ({
      customers: customers
    }));
  }
  
});

const pos = create(posStore);

export default pos;