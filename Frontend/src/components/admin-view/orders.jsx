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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const statusColorMap = {
  confirmed: "bg-emerald-600",
  rejected: "bg-rose-600",
  pending: "bg-amber-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-indigo-500",
  delivered: "bg-green-600",
};

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function handleViewDetails(orderId) {
    dispatch(getOrderDetailsForAdmin(orderId));
  }

  function handleCloseDialog() {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Orders Management
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList?.length ? (
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order._id}
                  </TableCell>

                  <TableCell>
                    {order?.orderDate?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`capitalize px-3 py-1 text-white
                        ${statusColorMap[order.orderStatus] || "bg-slate-600"}`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>${order.totalAmount}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(order._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* SINGLE DIALOG */}
      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
        {orderDetails && (
          <AdminOrderDetailsView orderDetails={orderDetails} />
        )}
      </Dialog>
    </Card>
  );
}

export default AdminOrdersView;
