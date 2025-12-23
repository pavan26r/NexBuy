import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-0 h-10 w-10 rounded-xl transition-all duration-300 transform ${
            star <= rating
              ? "bg-amber-50 border-amber-200 text-amber-500 hover:scale-110 shadow-sm shadow-amber-100"
              : "bg-transparent border-slate-200 text-slate-400 hover:bg-slate-50 hover:border-slate-300"
          }`}
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-6 h-6 transition-all duration-300 ${
              star <= rating 
                ? "fill-amber-500 stroke-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]" 
                : "fill-transparent stroke-current"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;