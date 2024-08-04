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

interface ICustomer {
  customer_id: string;
  name: string;
  phone_number: number;
  created_at: string;
}
import { useToast } from "@/components/ui/use-toast";
import { addCustomer } from "@/actions/customers";

export default function AddCustomer() {

  const [customer, SetCustomer] = useState<ICustomer>()
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
    phone_number: z.string()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone_number: ""
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    let data: any = {
      obj: values,
      token: localStorage.getItem('posauth')
    }
    addCustomer(data).then((response:any)=> {
      if(response.status) {
        toast({
          variant: "destructive",
          title: "Customer added successfully"
        })
        setTimeout(()=> {
          router.push('/dashboard/customers')
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
                <Link href="/dashboard/customers">Customers</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Customer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="w-full bg-muted/40">
          <CardHeader>
            <CardTitle className="text-primary">Add Customer</CardTitle>
            <CardDescription>Add customer you want to be</CardDescription>
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
                          <Input type="text" placeholder="Enter customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter customer phone number" {...field} onChange={(e)=> form.setValue('phone_number', (e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    </>
  );
}
