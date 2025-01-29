import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, SquarePen } from "lucide-react";
import placeholder from "@/assets/product-placeholder.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/features/products/productPaginateThunk";

const UpdateProductModal = ({ id }) => {
  const { categories } = useSelector((state) => state.categories);
  const { results } = useSelector((state) => state.products);
  const productDetails = results.find((item) => item.id === id) || {};
  const { name, category, price, stock, image } = productDetails;

  const [imageSrc, setImageSrc] = useState(image);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: name,
    category: category.toString() || null,
    price: price,
    stock: stock,
    image: null,
  });
  const [error, SetError] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });
  const formRef = useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isOpen) {
      setProduct({
        name: productDetails.name || "",
        category: productDetails.category?.toString() || null,
        price: productDetails.price || "",
        stock: productDetails.stock || "",
        image: null,
      });
      setImageSrc(productDetails.image || null);
    }
  }, [isOpen, productDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setProduct({
        ...product,
        image: file,
      });
    }
  };

  const handleFormReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: null,
    });
    SetError({
      name: null,
      category: null,
      price: null,
      stock: null,
      image: null,
    });
    setImageSrc(placeholder);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const productForm = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "image" && product[key] === null) {
        return
      } else {
        productForm.append(key, product[key]);
      }
    });

    try {
      await dispatch(updateProduct({ id: id, payload: productForm })).unwrap();
      handleFormReset();
      setIsOpen(false);
    } catch (error) {
      SetError({ ...error });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] min-w-fit overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Product</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details of your product. Click Add Product when you're
            done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          ref={formRef}
          id="product-form"
          encType="multipart/form-data"
          className="grid grid-cols-2 gap-3 max-w-[35rem] md:gap-9 md:grid-cols-4"
        >
          <div className="flex flex-col gap-2 col-span-2 items-center">
            <img
              src={imageSrc || placeholder}
              alt="product-image"
              className="bg-secondary rounded-md md:size-full size-[15rem]"
            />
            <div className="grid items-center gap-1.5 w-full">
              <Label htmlFor="picture">Image</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-destructive text-sm font-medium -mt-2">
                {error?.image}
              </p>
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Name</Label>
              <Input
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
              <p className="text-destructive text-sm font-medium -mt-2">
                {error?.name}
              </p>
            </div>
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select
                value={product.category}
                onValueChange={(value) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    category: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-destructive text-sm font-medium -mt-2">
                {error?.category}
              </p>
            </div>
            <div className="grid gap-1.5">
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
              />
              <p className="text-destructive text-sm font-medium -mt-2">
                {error?.stock}
              </p>
            </div>
            <div className="grid gap-1.5 relative">
              <Label>Price</Label>
              <p className="absolute left-2.5 top-[1.70rem] font-sans">₱</p>
              <Input
                type="number"
                className="pl-6"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
              <p className="text-destructive text-sm font-medium -mt-2">
                {error?.price}
              </p>
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleFormReset}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            form="product-form"
            onClick={handleOnSubmit}
          >
            Update Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateProductModal;
