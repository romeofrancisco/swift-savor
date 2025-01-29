import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Delete } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { TAX_IN_TEXT } from "@/constants/order";
import { INSUFFICIENT_PAYMENT } from "@/constants/order";
import { postTransaction } from "@/features/transactions/transactionThunk";
import { clearOrder } from "@/features/order/orderSlice";
import { ORDER_FAILED } from "@/constants/toastMessages";

const PaymentModal = ({ isOpen, toggleDialog }) => {
  const [payment, setPayment] = useState(0);
  const [error, setError] = useState(null);
  const id = useSelector((state) => state.auth?.user?.id);
  const { orders, subTotal, total, tax } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    const value = e.target.innerText;

    if (payment === 0) {
      setPayment(value);
    } else {
      setPayment((prev) => prev + value);
    }
  };

  const handleOnBackSpace = () => {
    setPayment((prev) => prev.slice(0, -1));
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only digits
      setPayment(value.replace(/^0+/, "")); // Remove leading zeros
    }
  };

  const handleOnConfirm = async () => {
    // Validate payment sufficiency
    if (payment < total) {
      setError(INSUFFICIENT_PAYMENT);
      return;
    }

    // Prepare the order payload
    const order = {
      cashier: id,
      orders: orders.map(({ product, quantity }) => ({
        product,
        quantity: parseInt(quantity, 10),
      })),
      payment: { amount: parseFloat(payment) },
    };

    try {
      setError(null)
      toggleDialog();
      // Dispatch the transaction and handle its result
      const result = await dispatch(postTransaction(order));
  
      if (postTransaction.fulfilled.match(result)) {
        // Clear payment and orders if success
        setPayment(0);
        dispatch(clearOrder());
      } else if (postTransaction.rejected.match(result)) {
        throw new Error(result.payload || "Transaction failed.");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      setError(error.message || "Transaction failed. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px] min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Payment Confirmation</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 mb-5">
          <table className="border-collapse h-1 border-spacing text-muted-foreground text-sm">
            <thead>
              <tr>
                <th className="font-semibold  text-start">Items</th>
                <th className="font-semibold ">Quantity</th>
                <th className="font-semibold ">Unit Price</th>
                <th className="font-semibold ">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr className="text-center" key={item.product}>
                  <td className=" text-start py-1">{item.name}</td>
                  <td className="">{item.quantity}</td>
                  <td className="">
                    <span className="font-sans">₱</span> {item.price}
                  </td>
                  <td className="">
                    <span className="font-sans">₱</span> {item.unitTotal}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-neutral-500">
                <td colSpan={3} className="text-end pe-4 pt-1">
                  Subtotal
                </td>
                <td className="text-center pt-2">
                  <span className="font-sans">₱</span> {subTotal}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-end pe-4">
                  Tax {TAX_IN_TEXT}
                </td>
                <td className="text-center py-2">
                  <span className="font-sans">₱</span> {tax}
                </td>
              </tr>
              <tr className="border-t border-dashed border-neutral-500 text-foreground">
                <td colSpan={3} className="text-end pe-4 pt-2">
                  Total Amount
                </td>
                <td className="text-center pt-2">
                  <span className="font-sans">₱</span> {total}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="grid grid-cols-3 w-[70%] gap-3 place-self-center">
            <div className="grid col-span-3">
              <div className="col-span-3 text-center">
                {error && (
                  <span className="text-destructive text-sm">{error}</span>
                )}
              </div>
              <Input
                className="col-span-3 h-12 text-center"
                value={payment}
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
            <Button className="col-span-3 mt-1" onClick={handleOnConfirm}>
              Confirm Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
