import Link from "next/link";
import { Pane } from "@/components/ui/pane";
import { Prompt } from "@/components/ui/prompt";
import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <Pane title="error 404" tone="danger" className="w-full max-w-lg">
        <div className="space-y-4 text-sm">
          <p>
            <Prompt /> <span>cd this-page</span>
          </p>
          <p className="text-ansi-red">cd: no such file or directory</p>
          <p className="text-fg-muted">The page you asked for doesn&apos;t exist or has moved.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link href="/" className={buttonVariants({ variant: "primary", size: "sm", bracketed: true })}>
              cd ~
            </Link>
            <Link href="/projects" className={buttonVariants({ size: "sm", bracketed: true })}>
              ls projects
            </Link>
          </div>
        </div>
      </Pane>
    </main>
  );
}
