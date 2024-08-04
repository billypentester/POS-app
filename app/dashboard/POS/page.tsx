'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import usePosStore from "@/store/pos";
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import DialogManager from "@/components/custom/DialogManager";
import { GetProducts } from "@/actions/products";
import { GetCustomers } from "@/actions/customers";
import useOrdertore from "@/store/order";
import { addOrder } from "@/actions/order";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { dataParams } from '@/data/Invoice'

interface IProduct {
    id: number,
    name: string,
    price: number,
    quantity: number
}


export default function Customers() {

  const [activeDialog, setActiveDialog] = useState('')
  const addProducts = usePosStore((state: any) => state.addProducts)
  const addCustomers = usePosStore((state: any) => state.addCustomers)
  const selectedCustomer = useOrdertore((state)=> state.customer)
  const products = usePosStore((state) => state.products);
  const [cartProducts, setCartProduct] = useState<IProduct[]>([])
  const router = useRouter()

  const addToCart = (product: any) => {
    let { product_id: id, name, price } = product
    let existingProduct = cartProducts.find((item: any) => item.id === id)
    if(existingProduct) {
      let updatedProduct = cartProducts.map((item: any) => {
        if(item.id === id) {
          item.quantity += 1
        }
        return item
      })
      setCartProduct(updatedProduct)
    }
    else {
      setCartProduct([...cartProducts, { id, name, price, quantity: 1 }])
    }
  }

  const resetCart = () => {
    setCartProduct([])
  }

  const removeFromCart = (item: any) => {
    let updatedProduct = cartProducts.filter((product: any) => product.id !== item.id)
    setCartProduct(updatedProduct)
  }

  const subTotal = () => {
    let subTotal = 0;
    cartProducts.forEach((product: any) => {
      subTotal += product.quantity * product.price
    })
    return subTotal
  }

  interface items {
    name: string,
    price: number,
    quantity: number
  }

  


  const handleDownload = (data:any) => {
    
    const { items, order } = data

    const transFormItems = items.map((item: any, index: number) => {
        return [index+1, item.name, item.price, item.quantity, item.price*item.quantity]
    })

    dataParams.invoice.table = transFormItems
    dataParams.invoice.num = order.order_id
    dataParams.invoice.invDate = `Payment Date: ${order.created_at}`
    dataParams.invoice.additionalRows[0].col2 = subTotal().toString()
    dataParams.invoice.additionalRows[3].col2 = subTotal().toString()
    dataParams.contact.name = order.Customer.name
    dataParams.contact.phone = order.Customer.phone_number
  
    jsPDFInvoiceTemplate(dataParams)

  }

  const saveOrder = () => {
    let data:any = {
        token: localStorage.getItem('posauth'),
        obj: {
            items: cartProducts,
            customer_id: selectedCustomer,
            price: subTotal()
        }
    }
    addOrder(data)
        .then((res) => {
            if(res.status) {
                console.log(res)
                handleDownload(res.data)
                router.push('/dashboard/orders')
            }
        })
  }

  useEffect(()=> {

    const token = localStorage.getItem('posauth')
    if(token){
        GetProducts(token)
            .then((res) => {
                if(res.status) {
                    addProducts(res.data)
                }
            })
        GetCustomers(token)
            .then((res) => {
                if(res.status) {
                    addCustomers(res.data)
                }
            })
    
    }
    else {
      router.push('/login')
    }

  }, [])

  return (
    <Dialog>
        <div className="grid grid-cols-[1fr,7fr,4fr] gap-3" style={{ height: '100%' }}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Controls</CardTitle>
                    <CardDescription>Use below options to generate invoice</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="flex flex-col space-y-2">
                        {/* <DialogTrigger asChild>
                            <Button variant="default" className="w-full" onClick={()=> setActiveDialog('products')}>
                                <ShoppingCart size={16} className="mr-2" />
                                Products
                            </Button>
                        </DialogTrigger> */}
                        <DialogTrigger asChild>
                            <Button variant="default" className="w-full" onClick={()=> setActiveDialog('customers')}>
                                {/* <User size={16} className="mr-2" /> */}
                                Add Customer
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <Button variant="default" className="w-full" onClick={()=> setActiveDialog('notes')}>
                                {/* <NotepadText size={16} className="mr-2" /> */}
                                Add Note
                            </Button>
                        </DialogTrigger>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Add Products from below</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="overflow-auto" style={{ height: '31rem' }}>
                        <div className="grid grid-cols-4 gap-4">
                            {products.map((product: any) => (
                                <div key={product.product_id} className="bg-white rounded-md shadow-md cursor-pointer" onClick={()=> addToCart(product)}>
                                    <img className="rounded-t-md" src="https://americanathleticshoe.com/cdn/shop/t/23/assets/placeholder_600x.png?v=113555733946226816651665571258" />
                                    <div className="p-4">
                                        <h1>{product.name}</h1>
                                        <p>{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="relative">
                <CardContent className="p-0">
                    <section className="overflow-y-auto" style={{ height: '27rem' }}>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                cartProducts.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.quantity*item.price}</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size={"sm"} onClick={()=> removeFromCart(item)} style={{ padding: '0.5rem' }}>
                                                    X
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                        </Table>
                    </section>
                    <div className="absolute bottom-0 right-0 w-full bg-slate-50">
                        <div className="px-10 py-7">
                            <div className="flex flex-col space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold">{subTotal()}</span>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <span className="font-semibold">Discount</span>
                                        <span className="font-semibold">150</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Grand Total</span>
                                        <span className="font-semibold">1000</span>
                                    </div> */}
                                </div>
                                <div className="flex space-x-3">
                                    <Button variant="outline" className="w-full" onClick={()=> resetCart()}>Reset</Button>
                                    <Button variant="outline" className="w-full">Hold</Button>
                                    <Button variant="destructive" className="w-full" onClick={()=> saveOrder()}>Pay</Button>
                                </div>   
                            </div>     
                        </div>                    
                    </div>
                </CardContent>
            </Card>
        </div>
        <DialogManager activeDialog={activeDialog} />
    </Dialog>
  );
}
