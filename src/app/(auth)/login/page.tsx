"use client";

import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <div className="bg-primary/20 text-primary rounded-full p-3">
                    <Leaf className="h-8 w-8" />
                </div>
            </div>
            <CardTitle className="text-2xl font-bold">AgriVision</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@agrivision.com"
                defaultValue="farmer@agrivision.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Login
            </Button>
             <p className="text-xs text-muted-foreground text-center">Use any email/password to continue.</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
