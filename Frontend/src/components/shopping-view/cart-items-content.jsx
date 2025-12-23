import { Minus, Plus, Trash2 } from "lucide-react"; 
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Limit reached! Only ${getTotalStock} items available.`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart updated" });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Item removed from cart", variant: "destructive" });
      }
    });
  }

  return (
   
    <div className="group flex items-center gap-4 p-4 mb-3 rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-100">
      
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-20 h-20 md:w-24 md:h-24 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

  
      <div className="flex-1 min-w-0">
        <h3 className="text-sm md:text-base font-bold text-gray-800 truncate">
          {cartItem?.title}
        </h3>
        
        <div className="flex items-center gap-3 mt-3">
         
          <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50">
            <Button
              variant="ghost"
              className="h-7 w-7 rounded-full p-0 hover:bg-white hover:shadow-sm"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </Button>
            
            <span className="w-8 text-center text-xs font-bold text-gray-700">
              {cartItem?.quantity}
            </span>

            <Button
              variant="ghost"
              className="h-7 w-7 rounded-full p-0 hover:bg-white hover:shadow-sm"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <p className="text-sm md:text-base font-black text-blue-600">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        
        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;