'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loader"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()
  const [loading, setLoading] = React.useState(true)

  useEffect(()=> {

    let token = localStorage.getItem('posauth')
    if (token) {
      router.replace('/dashboard')
    }
    else {
      setLoading(false)
    }

  }, [router])

  return (
    <>
      {
        loading ?
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner className="h-20 w-20 text-primary" />
        </div>
        :
        <div className="h-screen flex items-center justify-center">
          <Card className="w-1/3 text-center">
            <CardHeader>
              <CardTitle>POS App</CardTitle>
              <CardDescription>A complete dynamic solution for retails and sales</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex justify-center space-x-3">
                  <Link href="/signup">
                    <Button> Sign Up </Button>
                  </Link>
                  <Link href="/login">
                    <Button> Login </Button>
                  </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      }
    </>
  );
}
