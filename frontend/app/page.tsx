
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [activeTab, setActiveTab] = useState("markets");

  console.log(activeTab,"actrive tab");


  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 md:px-6 flex items-center h-16 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <TrendingUpIcon className="w-6 h-6" />
            <span>Openlayer powered Defi Prediction Market</span>
          </Link>
        </div>
        <nav className="ml-auto flex gap-4 md:gap-6">
          <button
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              activeTab === "markets" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("markets")}
          >
            Markets
          </button>
          <button
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              activeTab === "create" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Market
          </button>
          <button
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              activeTab === "bets" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("bets")}
          >
            My Bets
          </button>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {activeTab === "markets" && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Active Markets</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Who will win the next election?</CardTitle>
                    <CardDescription>Expires: 2024-11-05</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Candidate A</div>
                        <div className="text-muted-foreground">2.5 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-lg font-bold">Candidate B</div>
                        <div className="text-muted-foreground">1.8 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Will Tesla stock reach $500 by 2025?</CardTitle>
                    <CardDescription>Expires: 2025-06-30</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Yes</div>
                        <div className="text-muted-foreground">3.2 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-lg font-bold">No</div>
                        <div className="text-muted-foreground">2.1 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Will the S&P 500 index reach 5000 by 2026?</CardTitle>
                    <CardDescription>Expires: 2026-12-31</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Yes</div>
                        <div className="text-muted-foreground">4.5 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-lg font-bold">No</div>
                        <div className="text-muted-foreground">1.6 odds</div>
                      </div>
                      <Button>Bet</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}
          {activeTab === "create" && (
            <section className="mt-12 md:mt-24">
              <h2 className="text-3xl font-bold mb-6">Create a New Market</h2>
              <form className="max-w-md mx-auto space-y-4">
                <Input type="text" placeholder="Market Name" className="w-full" />
                <Input type="date" placeholder="Expiration Date" className="w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Odds for Option A" className="w-full" />
                  <Input type="number" placeholder="Odds for Option B" className="w-full" />
                </div>
                <Button type="submit" className="w-full">
                  Create Market
                </Button>
              </form>
            </section>
          )}
          {activeTab === "bets" && (
            <section className="mt-12 md:mt-24">
              <h2 className="text-3xl font-bold mb-6">My Bets</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Who will win the next election?</CardTitle>
                    <CardDescription>Expires: 2024-11-05</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Candidate A</div>
                        <div className="text-muted-foreground">Bet: $50</div>
                      </div>
                      <div className="text-primary font-bold">Pending</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Will Tesla stock reach $500 by 2025?</CardTitle>
                    <CardDescription>Expires: 2025-06-30</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">No</div>
                        <div className="text-muted-foreground">Bet: $100</div>
                      </div>
                      <div className="text-success font-bold">Won</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Will the S&P 500 index reach 5000 by 2026?</CardTitle>
                    <CardDescription>Expires: 2026-12-31</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">Yes</div>
                        <div className="text-muted-foreground">Bet: $75</div>
                      </div>
                      <div className="text-error font-bold">Lost</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="bg-muted border-t px-4 md:px-6 py-6 text-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; 2024 Openlayer Defi Prediction Market. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TrendingUpIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}