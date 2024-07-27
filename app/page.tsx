import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex  items-center justify-center">
    <Card className="w-1/3 text-center">
      <CardHeader>
        <CardTitle>POS Appp</CardTitle>
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
  );
}
