'use client'
import {usePathname, useRouter} from "next/navigation";

export default function Home() {
    console.log('app.usePathname()', usePathname());
  const { replace } = useRouter();
  replace("/task/four")
  return (
      <main className="flex min-h-screen flex-col p-6">
      </main>
  );
}
