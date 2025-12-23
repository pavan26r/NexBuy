import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-100 dark:bg-slate-950">
      
      {/* Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6
          bg-gradient-to-br from-slate-50 to-slate-100
          dark:from-slate-900 dark:to-slate-950">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;
