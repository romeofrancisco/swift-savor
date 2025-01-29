import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "@/pages/manager/Dashboard";
import Products from "@/pages/manager/Products";
import Transactions from "@/pages/manager/Transactions";
import Employee from "@/pages/manager/Employee";

const ManagerRoute = () => {
  return (

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="employees" element={<Employee />} />
        <Route path="transactions" element={<Transactions />} />
      </Routes>

  );
};

export default ManagerRoute;
