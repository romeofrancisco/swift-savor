import React from "react";
import { ShoppingCart, Tags, Banknote } from "lucide-react";
import { useSelector } from "react-redux";

const SummaryCards = () => {
  const { total_orders, total_items, daily_sales, weekly_sales, yearly_sales } =
    useSelector((state) => state.charts);

  return (
    <div className="grid grid-cols-5 px-10 gap-10 h-[6.5rem] mb-10 items-center">
      <div className="bg-card w-full rounded-md border p-5 grid grid-cols-5 grid-rows-2">
        <div className="col-span-4">Total Orders</div>
        <div className="row-span-2 grid items-center place-items-center bg-primary/50 rounded-full size-12">
          <ShoppingCart />
        </div>
        <div className="col-span-4 text-xl font-semibold">{total_orders}</div>
      </div>
      <div className="bg-card w-full rounded-md border p-5 grid grid-cols-5 grid-rows-2">
        <div className="col-span-4">Total Items</div>
        <div className="row-span-2 grid items-center place-items-center bg-primary/50 rounded-full size-12">
          <Tags />
        </div>
        <div className="col-span-4 text-xl font-semibold">{total_items}</div>
      </div>
      <div className="bg-card w-full rounded-md border p-5 grid grid-cols-5 grid-rows-2">
        <div className="col-span-4">Daily Sales</div>
        <div className="row-span-2 grid items-center place-items-center bg-primary/50 rounded-full size-12">
          <Banknote />
        </div>
        <div className="col-span-4 text-xl font-semibold">
          <span className="font-sans">₱</span> {daily_sales.toLocaleString()}
        </div>
      </div>
      <div className="bg-card w-full rounded-md border p-5 grid grid-cols-5 grid-rows-2">
        <div className="col-span-4">Weekly Sales</div>
        <div className="row-span-2 grid items-center place-items-center bg-primary/50 rounded-full size-12">
          <Banknote />
        </div>
        <div className="col-span-4 text-xl font-semibold">
          <span className="font-sans">₱</span> {weekly_sales.toLocaleString()}
        </div>
      </div>
      <div className="bg-card w-full rounded-md border p-5 grid grid-cols-5 grid-rows-2">
        <div className="col-span-4">Yearly Sales</div>
        <div className="row-span-2 grid items-center place-items-center bg-primary/50 rounded-full size-12">
          <Banknote />
        </div>
        <div className="col-span-4 text-xl font-semibold">
          <span className="font-sans">₱</span> {yearly_sales.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
