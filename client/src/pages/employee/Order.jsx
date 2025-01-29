import React from "react";
import OrderHeader from "@/components/Employee/OrderHeader";
import Products from "@/components/Employee/Products";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/features/categories/categoryThunk";
import { getProductList } from "@/features/products/ProductListThunk";
import OrdersTab from "@/components/Employee/OrdersTab";
import PaymentInfo from "@/components/Employee/PaymentInfo";
import Loading from "@/components/Loading";

const Order = () => {
  const { loading } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductList());
  }, [dispatch]);

  
  return (
    <div className="page grid grid-cols-12">
      <div className="col-span-8">
        <OrderHeader toggleFilter />
        <Products />
      </div>
      <div className="flex flex-col col-span-4 bg-secondary/30 rounded-md mb-10">
        <OrdersTab />
        <PaymentInfo />
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Order;
