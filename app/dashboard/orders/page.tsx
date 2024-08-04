'use client'

import { MegaTable } from "@/components/custom/MegaTable";
import { GetProducts, updateProduct } from "@/actions/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Pen, Lock, LockOpen, ReceiptText } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge"
import { GetOrders } from "@/actions/order";

interface IOrder {
  order_id: number,
  price: number,
  Customer: {
    name: string
  },
  created_at: string
}

export default function Orders() {

  const [orders, setOrders] = useState<IOrder[]>([])
  const router = useRouter()

  const transformDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  // const toogleProductStatus = (status: boolean, id: number) => {
  //   let data: any = {
  //     obj: { is_active: !status },
  //     product_id: id,
  //     token: localStorage.getItem('posauth')
  //   }
  //   updateProduct(data)
  //     .then((response: any)=> {
  //     if(response.status) {
  //       GetProducts(data.token).then((response)=> {
  //         if(response.status) {
  //           SetProducts(response.data)
  //         }
  //       })
  //     }
  //   })
  // }

  useEffect(()=> {

    const token: any = localStorage.getItem('posauth')
    if(token){
      GetOrders(token)
        .then((response: any) => {
          if (response.status) {
            console.log(response.data)
            setOrders(response.data);
          }
        })

    }
    else {
      router.push('/login')
    }

  }, [])

  return (
    <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <MegaTable title="Orders" exportCSV={true} addNew={false} addNewLink={'/dashboard/add-'} searchable={true}>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
                orders.length > 0 ?
                orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-medium">{order.order_id}</TableCell>
                    <TableCell className="font-medium">{order.Customer.name}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{transformDate(order.created_at)}</TableCell>
                    
                    
                    <TableCell className="flex space-x-3">
                      {/* <Link href={`/dashboard/edit-product/${product.product_id}`}>
                        <Button variant="link" className="text-slate-500" size="icon">
                          <Pen className="h-4 w-4" />
                        </Button>
                      </Link> */}
                      <Button variant="default" size="icon">
                        <ReceiptText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No Order found</TableCell>
                </TableRow>
              }
          </TableBody>
        </MegaTable>
    </>
  );
}
