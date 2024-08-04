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
import { Pen, Lock, LockOpen } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge"

interface IProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
  is_active: boolean
}

export default function Products() {

  const [products, SetProducts] = useState<IProduct[]>([])
  const router = useRouter()

  const transformDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  const toogleProductStatus = (status: boolean, id: number) => {
    let data: any = {
      obj: { is_active: !status },
      product_id: id,
      token: localStorage.getItem('posauth')
    }
    updateProduct(data)
      .then((response: any)=> {
      if(response.status) {
        GetProducts(data.token).then((response)=> {
          if(response.status) {
            SetProducts(response.data)
          }
        })
      }
    })
  }

  useEffect(()=> {

    const token = localStorage.getItem('posauth')
    if(token){
      GetProducts(token).then((response)=> {
        if(response.status) {
          SetProducts(response.data)
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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <MegaTable title="Products" exportCSV={true} addNew={true} addNewLink={'/dashboard/add-product'} searchable={true}>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
                products.length > 0 ?
                products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell className="font-medium">{product.product_id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      {
                        product.is_active ?
                          <Badge className="bg-green-500 text-white" variant="default">Active</Badge>
                        :
                          <Badge className="bg-red-500 text-white" variant="default">Inactive</Badge>
                      }
                    </TableCell>
                    <TableCell>{transformDate(product.created_at)}</TableCell>
                    <TableCell className="flex space-x-3">
                      <Link href={`/dashboard/edit-product/${product.product_id}`}>
                        <Button variant="link" className="text-slate-500" size="icon">
                          <Pen className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" onClick={()=> toogleProductStatus(product.is_active, Number(product.product_id))}>
                        {
                          product.is_active ?
                          <LockOpen className="h-4 w-4" />
                          :
                          <Lock className="h-4 w-4" />
                        }
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No products found</TableCell>
                </TableRow>
              }
          </TableBody>
        </MegaTable>
    </>
  );
}
