import React from "react";
import { Route, Routes } from "react-router";
import Order from "@/pages/employee/Order";
import Transactions from "@/pages/employee/Transactions";
import ProtectedRoute from "./ProtectedRoute";
import { EMPLOYEE } from "@/constants/roles";

const EmployeeRoute = () => {
  return (

      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="my-transactions" element={<Transactions />} />
      </Routes>

  );
};

export default EmployeeRoute;
