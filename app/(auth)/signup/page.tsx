// app/signup/page.tsx

import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-1 text-center">Create an Admin Account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Fill out the form to get started</p>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}
