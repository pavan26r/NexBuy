import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { PlusCircle, MapPinned } from "lucide-react"; // Naye icons

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Limit Reached",
        description: "You can add maximum of 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({ title: "Address Updated Successfully" });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({ title: "New Address Added" });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "Address Removed", variant: "destructive" });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto p-4 md:p-6">
      {/* SECTION 1: SAVED ADDRESSES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPinned className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Saved Addresses</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-medium">No addresses found. Add one below!</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: FORM CARD */}
      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="flex items-center gap-2 text-xl">
            {currentEditedId !== null ? (
              <span className="text-amber-600">Edit Selected Address</span>
            ) : (
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                <span>Add a Delivery Address</span>
              </div>
            )}
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            We'll use this address to deliver your awesome products!
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="bg-white dark:bg-slate-900">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Save Changes" : "Save Address"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
          </div>
          {currentEditedId !== null && (
            <button 
              onClick={() => {
                setCurrentEditedId(null);
                setFormData(initialAddressFormData);
              }}
              className="mt-4 text-sm text-slate-500 hover:text-indigo-600 underline transition-all"
            >
              Cancel Editing
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;