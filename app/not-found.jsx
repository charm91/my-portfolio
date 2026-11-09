import Link from "next/link";
import { HomeShell } from "@/components/HomeShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <HomeShell className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-28 text-center">
      <p className="text-sm text-secondary">404</p>
      <h1 className="text-3xl font-semibold md:text-4xl">Page not found</h1>
      <p className="max-w-md text-secondary">
        The page you&apos;re looking for could not be found.
      </p>
      <Button asChild size="lg" className="rounded-full px-6">
        <Link href="/">Return to home</Link>
      </Button>
    </HomeShell>
  );
}
