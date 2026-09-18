"use client";

import { Bell, Bike, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";

import { Button } from "../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "../../features/auth/hooks/useAuth";
import { clearAuthData } from "../../features/auth/utils/auth";
import {
    useMarkAsAllReadNotification,
    useMarkAsReadNotification,
    useNotification,
} from "@/features/notification/hooks/useNotification";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function MechanicHeader() {
    const navigate = useNavigate();

    const { data: notificationResponse } = useNotification();
    const markAsReadMutation = useMarkAsReadNotification();
    const markAsAllReadMutation = useMarkAsAllReadNotification();

    const notifications = notificationResponse?.data?.data ?? [];

    const unreadCount = notifications.filter(
        (notification) => notification.is_read === 0,
    ).length;

    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            clearAuthData();
            navigate("/login", { replace: true });
        }
    };

    return (
        <header className="w-full min-w-0 overflow-hidden border-b bg-background">
            <div className="mx-auto flex h-16 w-full min-w-0 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/mechanic"
                    className="flex shrink-0 items-center gap-2 text-lg font-bold"
                >
                    <Bike className="h-5 w-5 shrink-0 text-orange-500" />

                    <span className="hidden sm:inline">BikeAssist</span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden min-w-0 md:flex">
                    <NavigationMenuList className="gap-1"></NavigationMenuList>
                </NavigationMenu>

                {/* Right Side */}
                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
                    {/* Notifications */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative shrink-0"
                            >
                                <Bell className="h-5 w-5" />

                                {unreadCount > 0 && (
                                    <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#fc4c02] px-1 text-[10px] font-semibold text-white">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            align="end"
                            sideOffset={8}
                            className="w-80 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Notifications
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Your latest updates
                                    </p>
                                </div>

                                {(unreadCount > 0 ||
                                    markAsAllReadMutation.isPending) && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() =>
                                            markAsAllReadMutation.mutate()
                                        }
                                        disabled={
                                            markAsAllReadMutation.isPending
                                        }
                                        className="h-auto px-0 text-xs font-medium text-[#fc4c02] hover:bg-transparent hover:text-[#e64500] hover:underline disabled:opacity-50"
                                    >
                                        {markAsAllReadMutation.isPending
                                            ? "Marking..."
                                            : "Mark all as read"}
                                    </Button>
                                )}
                            </div>

                            {/* Notifications */}
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="px-4 py-8 text-center">
                                        <Bell className="mx-auto h-8 w-8 text-gray-300" />

                                        <p className="mt-2 text-sm font-medium text-gray-700">
                                            No notifications
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            You're all caught up.
                                        </p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <button
                                            key={notification.uuid}
                                            type="button"
                                            onClick={() => {
                                                if (!notification.is_read) {
                                                    markAsReadMutation.mutate(
                                                        notification.uuid,
                                                    );
                                                }
                                            }}
                                            className={`flex w-full gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                                                !notification.is_read
                                                    ? "bg-orange-50/40"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50">
                                                <Bell className="h-4 w-4 text-[#fc4c02]" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </p>

                                                <p className="mt-0.5 text-xs text-gray-500">
                                                    {notification.message}
                                                </p>

                                                <p className="mt-1 text-[11px] text-gray-400">
                                                    {notification.created_at}
                                                </p>
                                            </div>

                                            {!notification.is_read && (
                                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#fc4c02]" />
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

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
                                <Link to="/mechanic/profile">My Profile</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link to="/mechanic/settings">Settings</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                            >
                                {logoutMutation.isPending
                                    ? "Logging out..."
                                    : "Logout"}
                            </DropdownMenuItem>
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

                            <DropdownMenuItem
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                            >
                                {logoutMutation.isPending
                                    ? "Logging out..."
                                    : "Logout"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
