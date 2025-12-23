import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { ShoppingBag, Eye } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="border-none shadow-lg bg-white rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b p-6">
        <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-800">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-slate-600 py-4 px-6">Order ID</TableHead>
                <TableHead className="font-bold text-slate-600 py-4">Date</TableHead>
                <TableHead className="font-bold text-slate-600 py-4">Status</TableHead>
                <TableHead className="font-bold text-slate-600 py-4 text-right">Amount</TableHead>
                <TableHead className="py-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-mono text-xs font-medium text-slate-500 px-6">
                      #{orderItem?._id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`shadow-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-black text-slate-900">
                      ${orderItem?.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-lg group-hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-400">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;