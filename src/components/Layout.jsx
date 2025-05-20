import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import SidebarNav from "./SidebarNav";
import MobileDrawer from "./MobileDrawer";

function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen md:max-w-8xl w-full mx-auto overflow-x-hidden  flex flex-col lg:flex-row">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-2 border-b">
          <MobileDrawer />
          <h1 className="text-lg font-semibold text-black">Article Dashboard</h1>
        </header>

        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 bg-gray-100 border-r min-h-screen">
          <SidebarNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
