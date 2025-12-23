import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { API_BASE_URL } from "@/config/api";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/api/admin/products/upload-image`,
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-6 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-2 block">
        Insert A Product Image Here :)
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative rounded-xl p-5 transition-all
          bg-white/70 dark:bg-slate-900/60
          backdrop-blur-md shadow-sm
          border-2 border-dashed
          ${isEditMode ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-500"}
        `}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {/* EMPTY STATE */}
        {!imageFile && !imageLoadingState && (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-36 gap-2 text-sm
              ${isEditMode ? "cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <UploadCloudIcon className="w-11 h-11 text-indigo-500" />
            <span className="font-medium text-slate-600 dark:text-slate-300">
              Drag Or Drop image here :)
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG up to 5MB
            </span>
          </Label>
        )}

        {/* LOADING */}
        {imageLoadingState && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {/* FILE PREVIEW */}
        {imageFile && !imageLoadingState && (
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <FileIcon className="w-6 h-6 text-indigo-500" />
              <p className="text-sm font-medium truncate max-w-[180px]">
                {imageFile.name}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
