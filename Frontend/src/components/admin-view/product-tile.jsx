import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card
      className="group w-full max-w-sm mx-auto overflow-hidden
      border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-950
      shadow-sm hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product?.image || "/placeholder.png"}
          alt={product?.title || "Product image"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300
            group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black/45 opacity-0
          group-hover:opacity-100 transition-opacity
          flex items-center justify-center gap-3"
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit It
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              if (window.confirm("Delete this product permanently?")) {
                handleDelete(product?._id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="pt-4 space-y-1">
        <h2
          title={product?.title}
          className="text-base font-semibold truncate"
        >
          {product?.title}
        </h2>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold
              ${
                product?.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              }`}
          >
            ${product?.price}
          </span>

          {product?.salePrice > 0 && (
            <span className="text-sm font-bold text-emerald-600">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      {/* Mobile actions */}
      <CardFooter className="flex gap-2 md:hidden">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          onClick={() => {
            if (window.confirm("Delete this product permanently?")) {
              handleDelete(product?._id);
            }
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
