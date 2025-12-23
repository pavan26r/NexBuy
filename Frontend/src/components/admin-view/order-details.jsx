import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = { status: "" };

const statusColorMap = {
  confirmed: "bg-emerald-600",
  rejected: "bg-rose-600",
  pending: "bg-amber-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-indigo-500",
  delivered: "bg-green-600",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(e) {
    e.preventDefault();
    if (!formData.status) return;

    dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: formData.status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);

        toast({
          title: "Order Updated",
          description: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[650px]">
      <div className="grid gap-6">

        {/* ORDER META */}
        <div className="grid gap-3">
          {[
            ["Order ID", orderDetails?._id],
            ["Order Date", orderDetails?.orderDate?.split("T")[0]],
            ["Order Price", `$${orderDetails?.totalAmount}`],
            ["Payment Method", orderDetails?.paymentMethod],
            ["Payment Status", orderDetails?.paymentStatus],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <p className="font-medium">{label}</p>
              <Label className="text-muted-foreground">{value}</Label>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`px-3 py-1 text-white capitalize
                ${statusColorMap[orderDetails?.orderStatus] || "bg-slate-600"}`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* ITEMS */}
        <div className="grid gap-3">
          <p className="font-medium">Order Items</p>
          <ul className="grid gap-2 text-sm">
            {orderDetails?.cartItems?.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between bg-muted/40 rounded-md p-2"
              >
                <span className="font-medium">{item.title}</span>
                <span>x{item.quantity}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* SHIPPING */}
        <div className="grid gap-2">
          <p className="font-medium">Shipping Information</p>
          <div className="text-sm text-muted-foreground space-y-0.5">
            <span>{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>
              {orderDetails?.addressInfo?.city},{" "}
              {orderDetails?.addressInfo?.pincode}
            </span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            {orderDetails?.addressInfo?.notes && (
              <span>Note: {orderDetails?.addressInfo?.notes}</span>
            )}
          </div>
        </div>

        <Separator />

        {/* UPDATE STATUS */}
        <CommonForm
          formControls={[
            {
              label: "Update Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText="Update Status"
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
