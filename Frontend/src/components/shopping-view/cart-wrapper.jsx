import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems?.reduce(
      (sum, item) =>
        sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
      0
    ) || 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full bg-slate-50/50">
      <SheetHeader className="border-b pb-4 px-1">
        <SheetTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          Shopping Cart
          <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full ml-2">
            {cartItems?.length || 0} Items
          </span>
        </SheetTitle>
      </SheetHeader>

      <div className="flex-grow overflow-y-auto pr-2 mt-4">
        {cartItems && cartItems.length > 0 ? (
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <UserCartItemsContent key={item.productId || index} cartItem={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <p className="font-medium">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 space-y-4 border-t bg-white p-4 -mx-6 mb-[-24px] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Subtotal</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Order Total</span>
            <span className="text-xl font-black text-blue-600">
              ${totalCartAmount.toFixed(2)}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Shipping and taxes calculated at checkout
          </p>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full h-12 text-base font-bold rounded-xl bg-slate-900 hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]"
        >
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;