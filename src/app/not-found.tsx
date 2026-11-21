import Link from "next/link";
import { PageHeader } from "@/components/content/page-header";
import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <main className="space-y-6">
      <p className="text-sm font-bold text-ansi-red">error 404</p>
      <PageHeader title="Not found">This page doesn&apos;t exist or has moved.</PageHeader>
      <div className="flex flex-wrap gap-2">
        <Link href="/" className={buttonVariants({ variant: "primary", size: "sm" })}>
          home
        </Link>
        <Link href="/projects" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          projects
        </Link>
      </div>
      <p className="text-xs text-fg-subtle">
        or press <span className="text-accent">:</span> to search
      </p>
    </main>
  );
}
