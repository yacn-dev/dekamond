"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/utils";
import { User } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = storage.get("user");
    
    if (!userData) {
      router.push("/login");
    } else {
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    storage.remove("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center py-8 px-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              داشبورد
            </h1>
            <p className="text-gray-600 mt-1">مدیریت حساب کاربری</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 px-6 py-2 rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            خروج
          </Button>
        </header>
        
        <main className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col items-center -mt-16">
                <div className="relative">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mt-4">
                  خوش آمدید، {user.name.first} {user.name.last}!
                </h2>
                
                <p className="text-gray-600 mt-2 flex items-center">
                  <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm text-blue-600">وضعیت حساب</p>
                  <p className="text-lg font-semibold text-gray-900">فعال</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm text-green-600">احراز هویت</p>
                  <p className="text-lg font-semibold text-gray-900">تکمیل شده</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mr-4">
                  <p className="text-sm text-purple-600">عضویت از</p>
                  <p className="text-lg font-semibold text-gray-900">امروز</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 mx-8 mb-8 rounded-2xl p-6 text-center">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">به خانواده ما خوش آمدید!</h3>
              <p className="opacity-90">شما با موفقیت وارد سیستم شده‌اید و می‌توانید از تمام امکانات استفاده کنید.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}