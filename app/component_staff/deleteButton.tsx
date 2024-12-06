// DeleteButton.tsx
"use client";

export default function DeleteButton({
  id,
  deletePost,
}: {
  id: number;
  deletePost: Function;
}) {
  return (
    <button
      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center border-indigo-50 absolute top-2 right-2"
      onClick={() => deletePost(id)}
    >
      x
    </button>
  );
}
