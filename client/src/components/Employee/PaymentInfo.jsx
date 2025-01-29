import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TAX_IN_TEXT } from "@/constants/order";
import { Button } from "../ui/button";
import PaymentModal from "./PaymentModal";

const PaymentInfo = () => {
  const { total, subTotal, orders } = useSelector((state) => state.orders);
  const { tax } = useSelector((state) => state.orders);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mt-auto">
      <div className="grid gap-1">
        <div className="flex justify-between border-t border-neutral-500 px-3 pt-2">
          <p className="text-muted-foreground text-sm">Sub Total</p>
          <p className="text-sm">
            <span className="font-sans">₱</span> {subTotal}
          </p>
        </div>

        <div className="flex justify-between px-3 pb-1">
          <p className="text-muted-foreground text-sm">
            Tax {TAX_IN_TEXT} (VAT included)
          </p>
          <p className="text-sm">
            <span className="font-sans">₱</span> {tax}
          </p>
        </div>

        <div className="flex justify-between px-3 border-t border-neutral-500 border-dashed pt-1">
          <h5 className="font-semibold">Total</h5>
          <p className="font-semibold">
            <span className="font-sans">₱</span> {total}
          </p>
        </div>
        <Button
          className="mx-5 mt-2 mb-4"
          onClick={toggleDialog}
          disabled={orders.length > 0 ? false : true}
        >
          Proceed to Payment
        </Button>
        <PaymentModal isOpen={isOpen} toggleDialog={toggleDialog} />
      </div>
    </div>
  );
};

export default PaymentInfo;
