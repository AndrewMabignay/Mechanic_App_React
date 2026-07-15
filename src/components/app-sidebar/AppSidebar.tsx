import { Sidebar, SidebarHeader } from "../ui/sidebar";

export default function AppSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <TeamSwit />
                </SidebarHeader>

                <SidebarContent>
                    <NavMain />
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}