import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import QuantityModal from "./QuantityModal";

const Products = () => {
  const { products } = useSelector((state) => state.productList);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { filter } = useSelector((state) => state.productList);

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      filter ? item.category === filter : true
    );
  }, [products, filter]);

  const toggleDialog = (product) => {
    setIsOpen((prev) => !prev);
    setSelected(product);
  };

  return (
    <ScrollArea className="h-[calc(100vh-11rem)]">
      <div className="flex flex-wrap gap-8 pt-[2.5rem] justify-center h-full pb-4 px-4">
        {filteredProducts.length > 0 ? (
          filteredProducts?.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col items-center bg-secondary/40 
              h-[11rem] w-[11rem] rounded-md my-5 pt-[5.5rem] cursor-pointer"
              onClick={() => toggleDialog(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute size-[7.8rem] -top-12 ml-auto mr-auto left-0 right-0"
              />
              <h2 className="font-semibold">{product.name}</h2>
              <span className="text-sm text-primary">
                <span className="font-sans">₱ </span>
                {product.price}
              </span>
              <span className="text-sm text-muted-foreground">
                Stock: {product.stock}
              </span>
            </div>
          ))
        ) : (
          <div className="grid items-center text-center w-full h-[calc(100vh-25rem)]">
            <h1 className="text-3xl font-semibold">No Products</h1>
          </div>
        )}
        <QuantityModal
          isOpen={isOpen}
          toggleDialog={toggleDialog}
          product={selected}
        />
      </div>
    </ScrollArea>
  );
};

export default Products;
