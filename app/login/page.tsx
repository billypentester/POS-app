import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function LoginForm() {

  async function LoginAccount(formData: FormData) {
    
    'use server'

    const data = Object.fromEntries(formData.entries())
    console.log(data)

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // get the response
    const responseData = await response.json()
    console.log(responseData)

    if(responseData.status) {
      console.log('Account Login')
      redirect('/dashboard')
    }
    else {
      console.log('Account not Login')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={LoginAccount}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="flex flex-col w-full">
          <Button className="w-full" type="submit">Sign in</Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
        </form>
      </CardContent>
      {/* <CardFooter>
        
      </CardFooter> */}
    </Card>
    </div>
  )
}
