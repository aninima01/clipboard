"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [snippet, setSnippet] = useState("");

  const saveSnippet = async () => {
    console.log("snippet", snippet);
    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippet }),
    });

    const createdSnippet = await response.json();
    router.push(`/snippets/${createdSnippet.slug}`);
  };
  return (
    <>
      <div className="flex flex-col justify-between items-center mt-20">
        <Link href="/">
          <span className="text-white font-semibold bg-zinc-950 text-4xl p-2 rounded hover:opacity-80 cursor-pointer">
            Clipboard.io
          </span>
        </Link>

        <p className="mt-5 text-xl text-center">
          Paste your text or code below to instantly generate a simple,<br></br>
          shareable link. The fastest way to share snippets online.
        </p>
      </div>

      <div className="mt-10 flex flex-col justify-between items-center">
        <textarea
          onChange={(e) => setSnippet(e.target.value)}
          placeholder="Write your text here"
          className="border border-gray-300 rounded-lg p-4 
                     w-2/3 h-[150px] 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <div
          onClick={saveSnippet}
          className="text-orange-400 mt-10 border-2 border-orange-500 rounded-xl px-2 py-2"
        >
          Create Share
        </div>
      </div>
    </>
  );
}
