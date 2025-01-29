import React from "react";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeOrder,
} from "@/features/order/orderSlice";
import {
  decreaseStock,
  increaseStock,
} from "@/features/products/productListSlice";
import { INCREMENT, DECREMENT } from "@/constants/order";

const QuantityButton = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.products);

  const handleOnClick = (action) => {
    const product = products.find((item) => item.id === id);
    const order = { id, quantity: 1 };

    if (action === INCREMENT) {
      if (product.stock <= 0) return;
      dispatch(incrementQuantity(order));
      dispatch(decreaseStock(order));
      return;
    }

    if (action === DECREMENT) {
      dispatch(increaseStock(order));
      dispatch(decrementQuantity(order));
      if (quantity <= 1) {
        dispatch(removeOrder(order));
      }
    }
  };

  return (
    <div className="grid grid-cols-3 w-[5.5rem] border-[1px] bg-secondary/50 rounded-md items-center text-center h-[2.5rem]">
      <button className="flex justify-center">
        <Plus size={15} onClick={() => handleOnClick(INCREMENT)} />
      </button>
      <span className="text-sm">{quantity}</span>
      <button className="flex justify-center">
        <Minus size={15} onClick={() => handleOnClick(DECREMENT)} />
      </button>
    </div>
  );
};

export default QuantityButton;
