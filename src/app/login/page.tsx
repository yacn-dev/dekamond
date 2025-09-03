import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود | سیستم احراز هویت",
  description: "صفحه ورود به سیستم احراز هویت",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ورود به سیستم</h1>
          <p className="text-gray-600">لطفاً شماره موبایل خود را وارد کنید</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-2 space-x-reverse">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">فرمت‌های قابل قبول:</p>
              <div className="text-xs text-blue-600 space-y-1">
                <p className="bg-blue-100 px-2 py-1 rounded-md inline-block">09xxxxxxxxx</p>
                <p className="bg-blue-100 px-2 py-1 rounded-md inline-block mx-2">+989xxxxxxxxx</p>
                <p className="bg-blue-100 px-2 py-1 rounded-md inline-block">00989xxxxxxxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}