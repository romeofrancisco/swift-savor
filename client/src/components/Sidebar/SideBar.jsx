import React from "react";
import { managerNav, employeeNav } from "@/constants/navigation";
import { MANAGER, EMPLOYEE } from "@/constants/roles";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import UserNav from "./UserNav";
import { useSelector } from "react-redux";


const SideBar = () => {
  const user = useSelector((state) => state.auth.user);

  const items = React.useMemo(() => {
    switch (user?.role) {
      case MANAGER:
        return managerNav;
      case EMPLOYEE:
        return employeeNav;
      default:
        return [];
    }
  },[user]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Swift<span className="text-primary">Savor</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={60} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
