import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { MapPin, Phone, StickyNote } from "lucide-react"; // Icons for better look

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer transition-all duration-300 overflow-hidden ${
        isSelected
          ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 shadow-md"
          : "border-slate-200 hover:border-slate-400 shadow-sm"
      } bg-white dark:bg-slate-900 rounded-xl`}
    >
      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
          Selected
        </div>
      )}

      <CardContent className="grid p-5 gap-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Address</span>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
              {addressInfo?.address}, {addressInfo?.city}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-bold mt-1">
              {addressInfo?.pincode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400" />
          <p className="text-sm text-slate-700 dark:text-slate-300">{addressInfo?.phone}</p>
        </div>

        {addressInfo?.notes && (
          <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
            <StickyNote className="w-3.5 h-3.5 mt-0.5 text-slate-400" />
            <p className="text-xs text-slate-500 italic">
              {addressInfo?.notes}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
          onClick={(e) => {
            e.stopPropagation(); // Card click trigger na ho
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-slate-400 hover:text-red-600 hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation(); // Card click trigger na ho
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;