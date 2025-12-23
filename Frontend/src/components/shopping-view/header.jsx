import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Search, Bell } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row gap-8 lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <span
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="relative text-[15px] font-semibold text-slate-600 cursor-pointer transition-all duration-300 hover:text-indigo-600 group py-1"
        >
          {menuItem.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
        </span>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="flex items-center gap-2">
         {/* Search Shortcut Icon */}
        <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-full">
           <Search className="w-5 h-5" />
        </Button>
        
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="ghost"
            size="icon"
            className="relative bg-slate-50 hover:bg-indigo-50 transition-colors rounded-full p-2"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            {cartItems?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white border-2 border-white animate-bounce">
                {cartItems.items.length}
              </span>
            )}
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems?.items || []}
          />
        </Sheet>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer group">
            <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 ring-2 ring-slate-100">
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold">
                {user?.userName?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden xl:flex flex-col items-start leading-none">
                <span className="text-sm font-bold text-slate-800">{user?.userName}</span>
                <span className="text-[11px] text-slate-400">Account Settings</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-2 mt-3 rounded-2xl shadow-xl border-slate-100">
          <DropdownMenuLabel className="font-semibold text-slate-500 px-3 py-2">My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50" onClick={() => navigate("/shop/account")}>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><UserCog size={16}/></div>
            <span className="font-medium">Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-rose-600 hover:bg-rose-50" onClick={() => dispatch(logoutUser())}>
            <div className="p-2 bg-rose-50 rounded-lg"><LogOut size={16}/></div>
            <span className="font-medium">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        <Link to="/shop/home" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-200">
            <HousePlug className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            <span className="text-indigo-600">Store</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>

          {/* Mobile View Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-slate-100 rounded-lg">
                <Menu className="h-7 w-7 text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0 border-none rounded-l-[40px]">
               <div className="p-10 h-full bg-white flex flex-col gap-10">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="h-10 w-1 bg-indigo-600 rounded-full"/>
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight">Navigation</h2>
                  </div>
                  <MenuItems />
                  <div className="mt-auto border-t pt-8">
                    <HeaderRightContent />
                  </div>
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;