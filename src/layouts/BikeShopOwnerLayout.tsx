import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import BikeShopOwnerSidebar from "../components/layout/BikeShopOwnerSidebar";

export default function BikeShopOwnerLayout() {
    return (
        <>
            <SidebarProvider>
                <BikeShopOwnerSidebar />

                <main className="w-full p-4">
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    );
}