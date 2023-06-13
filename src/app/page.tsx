import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Hi there from Multus AQW Guild!
      <Link href={"https://docs-multus.vercel.app/"} className="underline">Check the docs</Link>
    </main>
  );
}
