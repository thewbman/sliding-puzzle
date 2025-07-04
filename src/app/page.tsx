"use client";
import Link from "next/link";

import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Link href={"/game"}>Game page</Link>
        </main>
      </div>
    </>
  );
}
