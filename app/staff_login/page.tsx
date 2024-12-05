"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import login from "../action/staffLogin";
import SubmitButton from "../component/SubmitButton";

export default function StaffLogin() {
    const [data, action] = useActionState(login, {});
    const router = useRouter();

    useEffect(() => {
        if (data.message === "Login Success") {
            router.push("/staff/dashboard");
        }
    }, [data.message, router]);

    return (
        <div className="relative max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
          
    
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form action={action} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {data.error?.email && (
                <div className="mt-1 text-sm text-red-600">{data.error?.email[0]}</div>
              )}
            </div>
    
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {data.error?.password && (
                <div className="mt-1 text-sm text-red-600">{data.error?.password[0]}</div>
              )}
            </div>
    
            {/* Error Message */}
            {data.error?.message && (
              <div className="text-sm text-red-600">{data.error?.message}</div>
            )}
    
            {/* Submit Button or Success Message */}
            <div>
              {data.message ? (
                <p className="text-sm text-green-600">{data.message}</p>
              ) : (
                <SubmitButton label={"Login"}/>
              )}
            </div>
          </form>
        </div>
      );
}
