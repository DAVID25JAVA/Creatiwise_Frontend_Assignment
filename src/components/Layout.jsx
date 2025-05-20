import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import SidebarNav from "./SidebarNav";
import MobileDrawer from "./MobileDrawer";

function Layout({ children }) {
  return (
    <SidebarProvider>
      <main className="flex min-h-screen flex-col md:flex-row">
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-between   py-2 md:hidden border-b">
          <MobileDrawer />
          <h1 className="text-lg font-semibold text-black mx-2">Article Dashboard</h1>
        </div>

        {/* Sidebar */}
        <aside className="  hidden md:flex flex-col">
          <SidebarNav />
        </aside>

        {/* Main Content */}
        <div className=" w-full p-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default Layout;
