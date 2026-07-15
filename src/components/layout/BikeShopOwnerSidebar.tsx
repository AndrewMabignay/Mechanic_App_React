import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "../ui/sidebar";

import {
    Store,
    Wrench,
    Package,
    ChartColumn,
    LogOut,
    UserCircle2,
    Bike,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function BikeShopOwnerSidebar() {
    const user = JSON.parse(localStorage.getItem("bike_mechanic_user") || "{}");

    return (
        <Sidebar>

            {/* HEADER */}
            <SidebarHeader className="bg-amber-600">
                <div className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Bike className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold">
                            Bike Mechanic
                        </span>

                        <span className="text-xs text-muted-foreground">
                            Bike Shop Owner
                        </span>
                    </div>

                    
                </div>

                <SidebarSeparator />
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to="/shop/bike-shops">
                                <Store />
                                <span>Bike Shops</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to="/shop/services">
                                <Wrench />
                                <span>Services</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to="/shop/products">
                                <Package />
                                <span>Products</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to="/shop/reports">
                                <ChartColumn />
                                <span>Reports</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <SidebarSeparator />

                <SidebarMenu>
                    <SidebarMenuItem>

                        <SidebarMenuButton>
                            <UserCircle2 />

                            <div className="flex flex-col items-start">
                                <p className="line-clamp-2 font-medium">
                                    {user.firstName} {user.lastName}
                                </p>

                                <span className="text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                        </SidebarMenuButton>

                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    );
}