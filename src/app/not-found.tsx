"use client";
import Link from "next/link";

import Header from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h2>Page not found</h2>
          <Link href={"/game"}>Click here to go to the game page</Link>
        </main>
      </div>
    </>
  );
}
