'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"

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
  name: string;
  phone_number: string
}

import { useToast } from "@/components/ui/use-toast";
import { GetCustomer, updateCustomer } from "@/actions/customers";

export default function EditCustomer({ params }: { params: { slug: string } }) {

  const [customer, SetCustomer] = useState<ICustomer>()
  const router = useRouter();
  const { toast } = useToast()

  useEffect(()=> {

    const token = localStorage.getItem('posauth')
    if(token){
        let data = {
            token, 
            customer_id: Number(params.slug)
        }
        GetCustomer(data).then((response)=> {
            if(response.status) {
                SetCustomer(response.data)
                form.setValue('name', response.data.name)
                form.setValue('phone_number', response.data.phone_number)
            }
        })
    }
    else {
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
      customer_id: Number(params.slug),
      obj: values,
      token: localStorage.getItem('posauth')
    }
    updateCustomer(data).then((response:any)=> {
      if(response.status) {
        toast({
          variant: "destructive",
          title: "Customer updated successfully"
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
              <BreadcrumbPage>Edit Customer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="w-full bg-muted/40">
          <CardHeader>
            <CardTitle className="text-primary">Edit Customer</CardTitle>
            <CardDescription>Update customer you want to be</CardDescription>
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
                          <Input type="number" placeholder="Enter customer phone_number" {...field} onChange={(e)=> form.setValue('phone_number', (e.target.value))} />
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
