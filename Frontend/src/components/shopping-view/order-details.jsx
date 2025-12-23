import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Package, Truck, CreditCard } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-2xl">
      <DialogHeader className="p-6 bg-slate-50 border-b">
        <DialogTitle className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600" />
          Order Details
        </DialogTitle>
      </DialogHeader>

      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="grid gap-6">
          {/* Top Info Section */}
          <div className="grid grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Order ID</p>
              <p className="text-sm font-mono font-medium text-slate-700">{orderDetails?._id}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date</p>
              <p className="text-sm font-medium text-slate-700">{orderDetails?.orderDate.split("T")[0]}</p>
            </div>
          </div>

          {/* Payment & Status Summary */}
          <div className="grid gap-3 py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Total Amount
              </span>
              <span className="font-bold text-lg text-slate-900">${orderDetails?.totalAmount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Payment Status</span>
              <span className="capitalize font-medium text-indigo-600">{orderDetails?.paymentStatus}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Order Status</span>
              <Badge
                className={`shadow-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Items Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              Items Ordered ({orderDetails?.cartItems?.length})
            </h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              {orderDetails?.cartItems?.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm border-b border-slate-200 last:border-0 pb-2 last:pb-0">
                  <div className="grid gap-0.5">
                    <span className="font-bold text-slate-700">{item.title}</span>
                    <span className="text-xs text-slate-500 italic">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-slate-900">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Shipping Information
            </h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm space-y-1 text-slate-600 shadow-sm">
              <p className="font-bold text-slate-900 mb-1">{user.userName}</p>
              <p>{orderDetails?.addressInfo?.address}</p>
              <p>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</p>
              <p className="pt-2 flex items-center gap-2">
                <span className="font-medium text-slate-900">Phone:</span> {orderDetails?.addressInfo?.phone}
              </p>
              {orderDetails?.addressInfo?.notes && (
                <p className="mt-2 p-2 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100 italic">
                  Note: {orderDetails?.addressInfo?.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;