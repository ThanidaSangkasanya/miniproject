"use client"

import { logoutUser } from "@/utils/loginUser";

export default function Logout() {
  return (<button className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-300" 
    onClick={async () => await logoutUser()}>Logout</button>)
}