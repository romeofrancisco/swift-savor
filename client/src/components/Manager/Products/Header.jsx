import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Filter, ArrowUpDown } from "lucide-react";
import AddProductModal from "./AddProductModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "@/features/products/productPaginateThunk";

const Header = () => {
  const { categories } = useSelector((state) => state.categories);
  const [ordering, setOrdering] = useState("name");
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (ordering) {
      dispatch(getProducts({ page: 1, order: ordering }));
    }
  }, [ordering, dispatch]);

  return (
    <div className="flex items-center justify-between h-[5rem] px-8 gap-3">
      {/* Add Product Button */}
      <AddProductModal />

      <div className="flex gap-3">


        {/* Sort */}
        <Select value={ordering} onValueChange={(value) => setOrdering(value)}>
          <SelectTrigger className="w-[185px]">
            <Label className="flex gap-1">
              <ArrowUpDown size={15} />
              Sort by:
            </Label>
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
            <SelectItem value="created">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
