import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionPagination from "./TransactionPagination";
import TransactionHeader from "./TransactionHeader";

const TransactionsTable = () => {
  const { results, count } = useSelector((state) => state.transactions);

  return (
    <>
      <div className="sticky top-0 z-10 bg-background/80">
        <TransactionHeader />
        <p className="text-sm pe-5 py-1 text-end text-muted-foreground">
          Number of transactions: {count}
        </p>
        <Table className="border-t-neutral-500 border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Transaction ID</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead className="text-end pe-3">Quantity</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-end">Unit Price</TableHead>
              <TableHead className="text-end">Unit Total</TableHead>
              <TableHead className="text-end">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div className="flex-1 overflow-auto bg-background/50">
        <Table>
          <TableBody className="">
            {results.map((transaction) => {
              return (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-center pe-2 border-b-primary">
                    {transaction.orders.map((item, i) => (
                      <p key={i}>{item.quantity}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {transaction.orders.map((item, i) => (
                      <p key={i}>{item.product_name}</p>
                    ))}
                  </TableCell>
                  <TableCell className="item-center">
                    {transaction.orders.map((item, i) => (
                      <p key={i}>
                        <span className="font-sans">₱</span>{" "}
                        {item.product_price}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {transaction.orders.map((item, i) => (
                      <p key={i} className="text-center">
                        <span className="font-sans">₱</span> {item.total}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell className="text-end">
                    <span className="font-sans">₱</span> {transaction.total}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TransactionPagination />
    </>
  );
};

export default TransactionsTable;
