import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";
import { useDispatch } from "react-redux";
import { addOrder } from "@/features/order/orderSlice";
import { decreaseStock } from "@/features/products/productListSlice";
import { useSelector } from "react-redux";

const QuantityModal = ({ isOpen, toggleDialog, product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id, name, image, price } = product || [];
  const [error, setError] = useState(null);

  const handleOnClick = (e) => {
    const value = e.target.innerText;

    if (quantity === 1) {
      setQuantity(value);
    } else {
      setQuantity((prev) => prev + value);
    }
  };

  const handleOnBackSpace = () => {
    setQuantity((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only digits
      setQuantity(value.replace(/^0+/, "")); // Remove leading zeros
    }
  };

  const decreaseStockByQuantity = (order) => (dispatch, getState) => {
    const products = getState().productList.products;
    const product = products.find((item) => item.id === order.id);

    if (!product) {
      setError(`Product with id ${order.id} not found`);
      return false; // Failure
    }
    if (product.stock - order.quantity < 0) {
      setError("Not enough stock");
      return false; // Failure
    }
    dispatch(decreaseStock(order)); // Proceed to decrease stock
    return true; // Success
  };

  const handleOnAddToCart = () => {
    if (Number(quantity) < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    const order = {
      id,
      name,
      image,
      quantity: parseInt(quantity, 10), // Ensure quantity is a number
      price,
    };

    const success = dispatch(decreaseStockByQuantity(order));
    if (success) {
      dispatch(addOrder(order));
      setError(null);
      toggleDialog();
    }
  };

  React.useEffect(() => {
    setQuantity(1);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product?.name}</DialogTitle>
          <DialogDescription>
            Available Stock: {product?.stock}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-3">
          <div className="grid grid-cols-3 w-[55%] gap-3">
            <div className="grid col-span-3">
              <div className="col-span-3 text-center">
                {error && <span className="text-destructive">{error}</span>}
              </div>
              <Input
                className="col-span-3 h-12 text-center"
                value={quantity}
                onChange={handleOnChange}
              />
            </div>
            <Button variant="outline" onClick={handleOnClick}>
              1
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              2
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              3
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              4
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              5
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              6
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              7
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              8
            </Button>
            <Button variant="outline" onClick={handleOnClick}>
              9
            </Button>
            <Button
              variant="outline"
              className="col-start-2"
              onClick={handleOnClick}
            >
              0
            </Button>
            <div
              className="flex justify-center items-center cursor-pointer hover:bg-accent rounded-md"
              onClick={handleOnBackSpace}
            >
              <Delete size={25} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleOnAddToCart}>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuantityModal;
