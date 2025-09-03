"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateIranianMobile, formatIranianMobile } from "@/lib/validation";
import { storage } from "@/lib/utils";
import { User } from "@/types";

export function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateIranianMobile(phone)) {
      setError("لطفاً شماره موبایل معتبر وارد کنید (فرمت ایران)");
      return;
    }

    setIsLoading(true);

    try {
      const formattedPhone = formatIranianMobile(phone);
      
      // Make API request
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const user: User = data.results[0];
        
        // Store user data in localStorage
        storage.set("user", user);
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("No user data received");
      }
    } catch (err) {
      setError("خطایی در ورود رخ داده است. لطفاً دوباره تلاش کنید.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="09xxxxxxxxx"
          value={phone}
          onChange={handlePhoneChange}
          error={error}
          disabled={isLoading}
          dir="ltr"
          className="text-left"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        isLoading={isLoading}
        disabled={isLoading}
      >
        ورود
      </Button>
    </form>
  );
}