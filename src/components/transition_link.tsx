"use client";

import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react"
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    href: string;
    className: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({
    children,
    href,
    className,
    ...props
}: TransitionLinkProps) {
    const router = useRouter();
    const handleTransition = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
            e.preventDefault();
            // Exist Animation

            const body = document.querySelector("body");
            body?.classList.add("opacity-0", "transition-opacity", "duration-500", "ease-in-out");

            // Sleep
            await sleep(300);

           
            await router.push(href);
            // Enter Animation

            // Sleep
            await sleep(300);

            body?.classList.remove("opacity-0");
    }
    return (
       <Link 
            onClick={handleTransition}
            href={href} className={className} {...props}>{children}</Link> 
    )
}