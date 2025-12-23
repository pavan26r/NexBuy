import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group border-none shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
      <div 
        onClick={() => handleGetProductDetails(product?._id)} 
        className="relative cursor-pointer overflow-hidden"
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Icon Placeholder */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
          <Heart className="w-4 h-4" />
        </button>

        {/* Badges Logic */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.totalStock === 0 ? (
            <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="bg-amber-500 text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider animate-pulse">
              Low Stock: {product?.totalStock}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="bg-rose-600 text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-rose-200">
              Sale
            </Badge>
          ) : null}
        </div>
      </div>

      <CardContent className="p-5">
        <div className="mb-1 flex justify-between items-start">
          <h2 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors truncate">
            {product?.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-tighter">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[11px] font-medium text-slate-400 border-l pl-2">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {product?.salePrice > 0 ? (
            <>
              <span className="text-2xl font-black text-slate-900">${product?.salePrice}</span>
              <span className="text-sm font-bold text-slate-400 line-through">${product?.price}</span>
            </>
          ) : (
            <span className="text-2xl font-black text-slate-900">${product?.price}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full bg-slate-100 text-slate-400 rounded-xl font-bold uppercase tracking-widest h-12 border-none">
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Card क्लिक को रोकने के लिए
              handleAddtoCart(product?._id, product?.totalStock);
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-12 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;