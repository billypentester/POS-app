"use client"
import React from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { LoginAccount } from "@/actions/auth"

export default function LoginForm() {

  const router = useRouter()
  const { toast } = useToast()

  const loginAccount = async(event: any) => {
    event.preventDefault()
    const data = new FormData(event.target);

    let loginData: any = {
      email: data.get('email'),
      password: data.get('password')
    }

    let response = await LoginAccount(loginData)

    if(response.status){
      localStorage.setItem('posauth', response.data)
      router.push('/dashboard')
    }
    else{
      toast({
        variant: "destructive",
        title: response.message
      })
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
        <form onSubmit={loginAccount} className="grid gap-4">
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
    </Card>
    </div>
  )
}
