import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Filter, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "@/features/products/productListSlice";

const OrderHeader = () => {
  const { categories } = useSelector((state) => state.categories);
  const { filter } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  const handleOnChangeCategory = (value) => {
    dispatch(filterProducts(value));
  };

  return (
    <div className="flex flex-col py-5 px-10 gap-4 h-[8.7rem]">
      <h2 className="text-foreground text-4xl font-bold">
        Swift<span className="text-primary">Savor</span>
      </h2>
      <div className="flex gap-5">
        {/* Filter Category */}
        <Select
          value={filter}
          onValueChange={(value) => handleOnChangeCategory(value)}
        >
          <SelectTrigger className="w-[200px]">
            <Label className="flex gap-1">
              <Filter size={15} /> Category:
            </Label>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All</SelectItem>
            {categories.map((category) => (
              <SelectItem value={category.id} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <Search size={17} />
          </div>
          <Input
            className="h-10 pl-9 w-[20rem]"
            type="text"
            name="search"
            placeholder="Search product...."
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderHeader;
