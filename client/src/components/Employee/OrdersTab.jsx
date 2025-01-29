import React from "react";
import { useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import QuantityButton from "./QuantityButton";
import { useDispatch } from "react-redux";
import { removeOrder } from "@/features/order/orderSlice";
import { increaseStock } from "@/features/products/productListSlice";

const OrdersTab = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const deleteOrder = (id, quantity) => {
    const order = { id, quantity };
    dispatch(removeOrder(order));
    dispatch(increaseStock(order));
  };

  return (
    <div
      className={`overflow-y-auto rounded-md ${
        orders.length > 0 ? "max-h-[calc(100vh-15rem)]" : "h-full"
      }`}
    >
      <table className="w-full h-full border-separate border-spacing-y-4 overflow-y-auto -mt-4">
        <thead className="bg-secondary/50 rounded-lg h-[2.5rem] sticky top-0 z-10">
          <tr>
            <th className="text-center font-normal">Items</th>
            <th className="text-center font-normal pr-5">Qty</th>
            <th className="text-center font-normal">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.product} className="border-b-neutral-500">
                <td className="grid grid-cols-4 grid-rows-2 ps-4 max-w-[13rem]">
                  <img
                    className="size-[2.5rem] row-span-2"
                    src={order.image}
                    alt={order.name}
                  />
                  <h4 className="col-span-3 text-sm self-end">{order.name}</h4>
                  <p className="col-start-2 row-start-2 text-sm text-muted-foreground">
                    <span className="font-sans">₱</span>
                    {order.price}
                  </p>
                </td>
                <td className="">
                  <QuantityButton
                    quantity={order.quantity}
                    id={order.product}
                  />
                </td>
                <td className="text-sm text-center">
                  <span className="font-sans">₱</span>
                  {order.unitTotal}
                </td>
                <td className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => deleteOrder(order.product, order.quantity)}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center h-full align-middle">
                <span className="font-semibold text-2xl">Currently No Order</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTab;
