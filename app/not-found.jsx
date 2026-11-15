import Link from "next/link";
import { HomeShell } from "@/components/HomeShell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata = {
  title: `Page not found | ${SITE.name}`,
};

export default function NotFound() {
  return (
    <HomeShell errorPage className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-28 text-center">
      <p className="text-sm text-secondary">404</p>
      <h1 className="text-3xl font-semibold md:text-4xl">Page not found</h1>
      <p className="max-w-2xl text-secondary">
        The page may have moved, or the address may be incorrect.
      </p>
      <Button asChild size="lg" className="rounded-full px-6">
        <Link href="/portfolio">View case studies</Link>
      </Button>
    </HomeShell>
  );
}
