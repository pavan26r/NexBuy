import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
  ChartNoAxesCombined,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-col gap-1">
      {adminSidebarMenuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen && setOpen(false);
            }}
            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* MOBILE SIDEBAR */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-slate-950 text-slate-100"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-slate-800 pb-4">
              <SheetTitle
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-3 cursor-pointer"
              >
                <ChartNoAxesCombined className="w-7 h-7 text-indigo-500" />
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col
        border-r border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-950 p-6">

        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 cursor-pointer mb-8"
        >
          <ChartNoAxesCombined className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold tracking-tight">
            Admin Panel
          </h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
