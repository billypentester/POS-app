'use client'

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import usePosStore from "@/store/pos";
import useOrdertore from "@/store/order";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const OptionCard = ({ customer }: { customer: any }) => {
    return(
        <label>
        <input type="radio" name="product" className="card-input-element" />
            <Card className="card-input">
                <CardContent className="p-2">
                    <h1>{customer.name}</h1>
                    <h3>{customer.phone_number}</h3>
                </CardContent>
            </Card>
        </label>
    )
}

function Customers() {

    const customers = usePosStore((state) => state.customers);
    const setCustomer = useOrdertore((state)=> state.setCustomer)
    const selectedCustomer = useOrdertore((state)=> state.customer)
    
    const selectCustomer = (id: number) => {
        setCustomer(id)
        document.getElementById('closeDialog')?.click();
    }

    return(
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Customers</DialogTitle>
            <DialogDescription>
                Add customers to your store
            </DialogDescription>
        </DialogHeader>
        <div>
            <div className="grid grid-cols-1 gap-4 my-2">
                <RadioGroup>
                    {
                        customers.map((customer: any) => (
                            <label key={customer.customer_id}>
                                <input type="radio" name="product" className="card-input-element" checked={selectedCustomer == customer.customer_id} onChange={()=> selectCustomer(customer.customer_id)} />
                                <Card className="card-input">
                                    <CardContent className="p-2">
                                        <h1>{customer.name}</h1>
                                        <h3>{customer.phone_number}</h3>
                                    </CardContent>
                                </Card>
                            </label>
                        ))
                    }
                </RadioGroup>
            </div>
        </div>
        {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
        </DialogFooter> */}
    </DialogContent>
    )
}

function Products() {    

    return(
        <DialogContent style={{ maxWidth: "85%", height: "90%" }}>
            <DialogHeader>
                <DialogTitle>Products</DialogTitle>
                <DialogDescription>
                    Add products to your store
                </DialogDescription>
            </DialogHeader>
            <div className="w-full h-full">
                <div className="grid grid-cols-5 gap-4">
                    {/* {products.map((product: any) => (
                        <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                        </div>
                    ))} */}
                </div>
            </div>
            {/* <Card>
                <CardContent>
                    <div className="grid grid-cols-5 gap-4">
                        {products.map((product: any) => (
                            <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
                                <h1>{product.name}</h1>
                                <p>{product.price}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card> */}
            {/* <DialogFooter>
            <Button type="submit">Add to List</Button>
            </DialogFooter> */}
        </DialogContent>
    )
}

function Notes() {
    return(
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Notes</DialogTitle>
                <DialogDescription>
                    Add Notes to your store
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    )
}

const DialogManager = ({ activeDialog }: { activeDialog: string }) => {
  return (
    <>
      {activeDialog === "customers" && <Customers />}
      {activeDialog === "products" && <Products />}
      {activeDialog === "notes" && <Notes />}
    </>
  )
}

export default DialogManager
