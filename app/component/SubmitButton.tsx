'use client';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`px-4 py-2 font-semibold text-white transition-colors duration-200 rounded ${
        pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      }`}
      disabled={pending}
      type="submit"
    >
      {pending ? 'Submitting...' : label}
    </button>
  );
}