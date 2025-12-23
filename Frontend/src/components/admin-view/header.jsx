import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-5 py-3 
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
      border-b border-slate-700 shadow-md">
      {/* Menu Button  -> */}
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:inline-flex 
        bg-slate-800/60 hover:bg-slate-700 
        text-slate-200 backdrop-blur-md
        rounded-lg shadow-sm transition-all"
      >
        <AlignJustify className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Logout */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex items-center gap-2
          bg-red-600 hover:bg-red-700
          text-white font-semibold
          px-4 py-2 rounded-lg
          shadow-sm transition-all
          hover:scale-[1.03]"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
