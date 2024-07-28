"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function Dashboard() {

  const chartData = [
    { month: "January", desktop: 186, mobile: 100 },
    { month: "February", desktop: 305, mobile: 800 },
    { month: "March", desktop: 237, mobile: 500 },
    { month: "April", desktop: 73, mobile: 400 },
    { month: "May", desktop: 209, mobile: 300 },
    { month: "June", desktop: 214, mobile: 900 },
    { month: "July", desktop: 273, mobile: 200 },
    { month: "August", desktop: 273, mobile: 1000 },
    { month: "September", desktop: 273, mobile: 550 },
    { month: "October", desktop: 273, mobile: 400 },
    { month: "November", desktop: 273, mobile: 700 },
    { month: "December", desktop: 273, mobile: 600 },
  ]

  const customers: any[] = [
    { name: "John Doe", email: "john@gmail.com", purchase: "423023"},
    { name: "Ali Sheikh", email: "ali@gmail.com", purchase: "324560"},
    { name: "Sara Khan", email: "sara@gmail.com", purchase: "314344"},
    { name: "Bilal Ahmad", email: "bilal@gmail.com", purchase: "280932" },
    { name: "Aleeza Sheikh", email: "aleeza@gmail.com", purchase: "213032" },
  ]

  const chartConfig = {
    mobile: {
      label: "Desktop",
      color: "#2563eb",
    },
    
  } satisfies ChartConfig

  return (
    <div className="flex flex-col space-y-3">
        <div className="flex space-x-4">
          <Card className="w-1/4">
            <CardHeader className="pb-2">
              <CardDescription>Total Products</CardDescription>
              <CardTitle className="text-4xl">350</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/4">
            <CardHeader className="pb-2">
              <CardDescription>Total Customers</CardDescription>
              <CardTitle className="text-4xl">1240</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/4">
            <CardHeader className="pb-2">
              <CardDescription>Total Sale</CardDescription>
              <CardTitle className="text-4xl">Rs. 3,00,000</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/4">
            <CardHeader className="pb-2">
              <CardDescription>This Profit</CardDescription>
              <CardTitle className="text-4xl">Rs. 8,00,000</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex space-x-4">
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>Jan - Dec 2024</CardDescription>
            </CardHeader>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
              </BarChart>
            </ChartContainer>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month 
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter> */}
          </Card>
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Top Purchases</CardTitle>
              <CardDescription>Jan - Dec 2024</CardDescription>
            </CardHeader>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full px-3">
              {
                customers.map((customer, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="user" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <div className="text-lg font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                    <div className="font-medium">Rs. {customer.purchase}</div>
                  </div>
                ))
              }
            </ChartContainer>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
    </div>
  );
}
