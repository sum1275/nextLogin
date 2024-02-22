"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const logout = async () => {
    try {
      const logout = await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message);
      console.log("error message: ", error.message);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
    console.log(response.data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <br />
      <p>Profile Page</p>
      <h2>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        className="p-2 border bg-purple-500 border-gray-300 rounded-lg focus:border-gray-600"
        onClick={getUserDetails}
      >
        getUserDetails
      </button>
      <button
        className="p-2 border bg-blue-500 border-gray-300 rounded-lg focus:border-gray-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
