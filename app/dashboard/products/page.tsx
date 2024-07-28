'use client'

import { MegaTable } from "@/components/custom/MegaTable";
import { GetProducts } from "@/actions/products";
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
import { Pen, Lock } from "lucide-react";
import Link from "next/link";

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

export default function Products() {

  const [products, SetProducts] = useState<IProduct[]>([])
  const router = useRouter()

  const transformDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
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
        <MegaTable title="Products" exportCSV={true} addNew={true} searchable={true}>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
                products.length > 0 ?
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{transformDate(product.created_at)}</TableCell>
                    <TableCell className="flex space-x-3">
                      <Link href={`/dashboard/edit-product/${product.id}`}>
                        <Button variant="link" size="icon">
                          <Pen className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No products found</TableCell>
                </TableRow>
              }
          </TableBody>
        </MegaTable>
    </>
  );
}
