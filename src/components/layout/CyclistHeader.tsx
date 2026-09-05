"use client";

import { Bell, Bike, Menu, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function CyclistHeader() {
    return (
        <header className="w-full min-w-0 overflow-hidden border-b bg-background">
            <div className="mx-auto flex h-16 w-full min-w-0 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/cyclist"
                    className="flex shrink-0 items-center gap-2 text-lg font-bold"
                >
                    <Bike className="h-5 w-5 shrink-0 text-orange-500" />

                    <span className="hidden sm:inline">BikeAssist</span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden min-w-0 md:flex">
                    <NavigationMenuList className="gap-1">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/cyclist">Home</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Side */}
                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="hidden shrink-0 sm:inline-flex"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span className="hidden md:inline">
                                    John Andrew
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link to="/cyclist/profile">My Profile</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link to="/cyclist/settings">Settings</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild>
                                <Link to="/mechanic">Home</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link to="/mechanic/incoming-request">
                                    Incoming Request
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link to="/mechanic/profile">My Profile</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link to="/mechanic/settings">Settings</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
