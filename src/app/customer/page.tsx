"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        city,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <form
      className="w-[500px] mx-auto pt-20 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter customer name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded-md bg-[transparent]"
      />
      <input
        type="text"
        placeholder="Enter customer phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded-md bg-[transparent]"
      />
      <input
        type="text"
        placeholder="Enter customer city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border p-2 rounded-md bg-[transparent]"
      />

      <button
        disabled={isLoading}
        className="border-2 p-2 rounded w-[150px] mt-4"
      >
        {isLoading ? "Submitting ..." : "Submit"}
      </button>
    </form>
  );
};

export default Page;
