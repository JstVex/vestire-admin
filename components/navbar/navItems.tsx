'use client'

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavItems = () => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        }
    ]

    return (
        <nav className="flex items-center space-x-4 ml-6 lg:space-x-6">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}

export default NavItems;