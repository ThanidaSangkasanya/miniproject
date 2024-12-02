'use client';

import React from 'react';
import SubmitButton from '../component/SubmitButton';
import register from '../action/register';
import { useActionState } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
  const [data, action] = useActionState(register, {});

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
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

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {data.error?.name && (
            <div className="mt-1 text-sm text-red-600">{data.error?.name[0]}</div>
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
            <SubmitButton label="Register" />
          )}
        </div>
      </form>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link href="/blog" className="text-blue-500 hover:underline">
          Back
        </Link>
      </div>
    </div>
  );
}
