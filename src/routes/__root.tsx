import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import "../index.css";
import { BadgeIndianRupee, History, House, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';


export const Route = createRootRoute({
    component: () => (
        <>
            <div className="container px-5 mx-auto mt-6 mb-8 sm:max-w-3xl">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <h1 className="flex items-center gap-1 text-3xl font-bold tracking-tight noto-serif-display">
                            <BadgeIndianRupee size={30} /> Pennywise
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                title="Toggle theme"
                                asChild
                            >
                                <Link to="/" className="[&.active]:font-bold">
                                    <House />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                title="Toggle theme"
                                asChild
                            >
                                <Link to="/history" className="[&.active]:font-bold">
                                    <History />
                                </Link>
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            title="Toggle theme"
                        >
                            <Mail className="w-6 h-6 text-neutral-500" />
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
                <Outlet />
                <TanStackRouterDevtools />
            </div>
        </>
    ),
})