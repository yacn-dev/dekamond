"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateIranianMobile, formatIranianMobile } from "@/lib/validation";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(""); // پاک کردن خطاهای قبلی

    if (!validateIranianMobile(phone)) {
      setValidationError("لطفاً شماره موبایل معتبر وارد کنید (فرمت ایران)");
      return;
    }

    const formattedPhone = formatIranianMobile(phone);
    const user = await login(formattedPhone);

    if (user) {
      router.push("/dashboard");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    // پاک کردن هر دو خطا هنگام تایپ
    if (validationError) setValidationError("");
    if (error) clearError();
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
          error={validationError || error || undefined} // نمایش هر دو خطا
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
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            در حال ورود...
          </div>
        ) : (
          "ورود"
        )}
      </Button>
    </form>
  );
}