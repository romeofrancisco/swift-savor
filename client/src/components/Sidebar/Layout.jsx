import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../ui/sidebar";
import SideBar from "./SideBar";
import { Outlet } from "react-router";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import {
  MANAGER,
  EMPLOYEE,
  EMPLOYEE_ROUTE,
  MANAGER_ROUTE,
} from "@/constants/roles";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!user) return;

    // Redirect only if the current location doesn't match the user's role
    const isManagerRoute = location.pathname.startsWith(MANAGER_ROUTE);
    const isEmployeeRoute = location.pathname.startsWith(EMPLOYEE_ROUTE);

    if (user.role === MANAGER && !isManagerRoute) {
      navigate(MANAGER_ROUTE);
    } else if (user.role === EMPLOYEE && !isEmployeeRoute) {
      navigate(EMPLOYEE_ROUTE);
    }
  }, [user, location.pathname, navigate]);
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>

        <main className="w-full h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
