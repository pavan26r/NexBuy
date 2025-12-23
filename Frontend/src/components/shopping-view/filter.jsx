import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filter } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm sticky top-20">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2 text-slate-800">
          <Filter className="w-4 h-4 text-blue-600" />
          Filter
        </h2>
      </div>

      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={keyItem}>
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                {keyItem}
              </h3>
              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label 
                    key={option.id}
                    className="flex items-center gap-3 font-medium text-slate-700 cursor-pointer group transition-colors hover:text-blue-600"
                  >
                    <Checkbox
                      className="rounded-[4px] border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all group-hover:border-blue-400"
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span className="text-[15px]">{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            {index !== Object.keys(filterOptions).length - 1 && (
              <Separator className="bg-slate-50" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;