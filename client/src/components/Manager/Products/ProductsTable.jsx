import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import ProductsPagination from "./ProductsPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
} from "@/features/products/productPaginateThunk";
import { getCategories } from "@/features/categories/categoryThunk";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdateProductModal from "./UpdateProductModal";

function TableView() {
  const { results } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProducts({ page: 1, order: "name" }));
    dispatch(getCategories());
  }, []);

  const handleOnDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="h-[calc(100%-5rem)] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[100px]">Product</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right px-10">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results && results.length > 0 ? (
            results.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-2 md:w-[20rem]">
                  <Avatar>
                    <AvatarImage src={product.image} alt={product.name} />
                  </Avatar>
                  {product.name}
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.category_name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span className="font-sans">₱</span>
                  {product.price}
                </TableCell>
                <TableCell>{product.created}</TableCell>
                <TableCell className="text-end">
                  <UpdateProductModal id={product.id}/>
                  <DeleteConfirmationModal
                    deleteId={() => handleOnDelete(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6">No products available.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProductsPagination />
    </div>
  );
}

export default TableView;
