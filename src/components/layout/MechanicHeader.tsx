"use client";

import { Bell, Bike, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function MechanicHeader() {
    return (
        <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
                to="/mechanic"
                className="flex items-center gap-2 font-bold text-lg"
            >
                <Bike className="h-5 w-5 text-orange-500" />
                BikeAssist
            </Link>

            {/* Navigation */}
            <NavigationMenu>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <NavLink to="/mechanic">Home</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side */}
            <div className="flex items-center gap-3">

            <Button asChild>
                <Link to="/cyclist/request-mechanic">
                    Request Mechanic
                </Link>
            </Button>

            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>

                        <Button variant="ghost">
                            <User className="mr-2 h-4 w-4" />
                            John Andrew
                        </Button>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link to="/cyclist/profile">
                            My Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link to="/cyclist/settings">
                            Settings
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            </div>

        </div>
        </header>
    );
}