'use client'

import { GetProduct } from "@/actions/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { addProduct } from "@/actions/products"

import Link from "next/link"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface IProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}
import { useToast } from "@/components/ui/use-toast";

export default function Product({ params }: { params: { slug: string } }) {

  const [product, SetProduct] = useState<IProduct>()
  const router = useRouter();
  const { toast } = useToast()

  useEffect(()=> {
    const token = localStorage.getItem('posauth')
    if(!token){
        router.push('/login')
    }
  }, [])

  const FormSchema = z.object({
    name: z.string(),
    price: z.number({ message: "Price must be a number" }),
    quantity: z.number({ message: "Quantity must be a number" }),
    category: z.string(),
    description: z.string()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      category: "",
      description: ""
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    let data: any = {
      obj: values,
      token: localStorage.getItem('posauth')
    }
    addProduct(data).then((response:any)=> {
      if(response.status) {
        toast({
          variant: "destructive",
          title: "Product added successfully"
        })
        setTimeout(()=> {
          router.push('/dashboard/products')
        }, 500)
      }
    })
  }

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
              <BreadcrumbPage>Add Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="w-full bg-muted/40">
          <CardHeader>
            <CardTitle className="text-primary">Add Product</CardTitle>
            <CardDescription>Add product you want to be</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div id="customInputField" className="flex space-x-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name <span className="text-primary">*</span></FormLabel> 
                        <FormControl>
                          <Input type="text" placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter product quantity" {...field} onChange={(e)=> form.setValue('quantity', Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div id="customInputField" className="flex space-x-5">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter product price" {...field} onChange={(e)=> form.setValue('price', Number(e.target.value))}  />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter product category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    </>
  );
}
