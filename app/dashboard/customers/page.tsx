'use client'

import { MegaTable } from "@/components/custom/MegaTable";
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
import { GetCustomers } from "@/actions/customers";

interface ICustomer {
    customer_id: number,
    name: string,
    phone_number: string,
    category: string,
    created_at: string,
    updated_at: string
}

export default function Customers() {

  const [customers, SetCustomers] = useState<ICustomer[]>([])
  const router = useRouter()

  const transformDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  useEffect(()=> {

    const token = localStorage.getItem('posauth')
    if(token){
      GetCustomers(token).then((response)=> {
        if(response.status) {
          SetCustomers(response.data)
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
              <BreadcrumbPage>Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <MegaTable title="Customers" exportCSV={true} addNew={true} addNewLink={'/dashboard/add-customer'} searchable={true}>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
                customers.length > 0 ?
                customers.map((customer) => (
                  <TableRow key={customer.customer_id}>
                    <TableCell className="font-medium">{customer.customer_id}</TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.phone_number}</TableCell>
                    <TableCell>{transformDate(customer.created_at)}</TableCell>
                    <TableCell className="flex space-x-3">
                      <Link href={`/dashboard/edit-customer/${customer.customer_id}`}>
                        <Button variant="link" className="text-slate-500" size="icon">
                          <Pen className="h-4 w-4" />
                        </Button>
                      </Link>
                      {/* <Button variant="outline" size="icon" onClick={()=> toogleProductStatus(product.is_active, Number(product.id))}>
                        {
                          product.is_active ?
                          <LockOpen className="h-4 w-4" />
                          :
                          <Lock className="h-4 w-4" />
                        }
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No customers found</TableCell>
                </TableRow>
              }
          </TableBody>
        </MegaTable>
    </>
  );
}
