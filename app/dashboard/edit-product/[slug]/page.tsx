'use client'

import { GetProduct, GetProducts } from "@/actions/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

export default function Product({ params }: { params: { slug: string } }) {

  const [product, SetProduct] = useState<IProduct>()
  const router = useRouter();

  useEffect(()=> {

    const token = localStorage.getItem('posauth')
    if(token){
        let data = {
            token, 
            id: Number(params.slug)
        }
        GetProduct(data).then((response)=> {
            if(response.status) {
                SetProduct(response.data)
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
              <BreadcrumbLink>
                <Link href="/dashboard/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="w-full bg-muted/40">
          <CardHeader>
            <CardTitle className="text-primary">Edit Product</CardTitle>
            <CardDescription>Update product you want to be</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold text-primary">Product Name</label>
                  <input type="text" id="name" name="name" placeholder="Product Name" className="py-2 px-3 mt-1 border border-muted/60 rounded-md focus:outline-none focus:border-primary" value={product?.name} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-sm font-semibold text-primary">Price</label>
                  <input type="number" id="price" name="price" placeholder="Price" className="py-2 px-3 mt-1 border border-muted/60 rounded-md focus:outline-none focus:border-primary" value={product?.price} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="quantity" className="text-sm font-semibold text-primary">Quantity</label>
                  <input type="number" id="quantity" name="quantity" placeholder="Quantity" className="py-2 px-3 mt-1 border border-muted/60 rounded-md focus:outline-none focus:border-primary" value={product?.quantity} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-sm font-semibold text-primary">Category</label>
                  <input type="text" id="category" name="category" placeholder="Category" className="py-2 px-3 mt-1 border border-muted/60 rounded-md focus:outline-none focus:border-primary" value={product?.category} />
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="description" className="text-sm font-semibold text-primary">Description</label>
                  <textarea id="description" name="description" placeholder="Description" className="py-2 px-3 mt-1 border border-muted/60 rounded-md focus:outline-none focus:border-primary" value={product?.description} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button> Save </Button>
          </CardFooter>
        </Card>
    </>
  );
}
