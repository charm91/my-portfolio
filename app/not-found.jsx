import Link from "next/link";
import { HomeShell } from "@/components/HomeShell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata = {
  title: `Page not found | ${SITE.name}`,
};

export default function NotFound() {
  return (
    <HomeShell className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-28 text-center">
      <p className="text-sm text-secondary">404</p>
      <h1 className="text-3xl font-semibold md:text-4xl">Page not found</h1>
      <p className="max-w-md text-secondary">
        The page may have moved, or the address may be incorrect.
      </p>
      <Button asChild size="lg" className="rounded-full px-6">
        <Link href="/">Return to home</Link>
      </Button>
      <Link
        href="/portfolio"
        className="rounded-sm px-3 py-2 text-sm text-secondary underline underline-offset-4 hover:text-foreground"
      >
        View case studies
      </Link>
    </HomeShell>
  );
}
