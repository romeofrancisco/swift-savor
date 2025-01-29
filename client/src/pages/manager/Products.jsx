import React from "react";
import ProductsTable from "@/components/Manager/Products/ProductsTable";
import Header from "@/components/Manager/Products/Header";


const Products = () => {

  return (
    <div className="page md:px-5 md:pb-5">
      <div className="bg-card h-full md:h-[calc(100vh-4.5rem)] md:rounded-xl shadow-xl overflow-clip pb-4">
        <Header/>
        <ProductsTable/>
      </div>
    </div>
  );
};

export default Products;
