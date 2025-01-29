import React, { useState } from "react";
import { Table, TableFooter, TableRow, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "@/features/transactions/transactionThunk";
import { setCurrentPage } from "@/features/transactions/transactionSlice";

const TransactionPagination = () => {
  const { next, previous, count, dateFilter, currentPage } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  const totalPages = Math.ceil(count / 20);

  const handlePageClick = (page) => {
    const payload = {
      start_date: dateFilter.start_date,
      end_date: dateFilter.end_date,
      page,
    };
    dispatch(getTransactions(payload));
    dispatch(setCurrentPage(page));
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("ellipsis");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="sticky bottom-0 z-10 bg-background border-t">
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right py-2">
              <Pagination>
                <PaginationContent>
                  {previous && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageClick(currentPage - 1)}
                      />
                    </PaginationItem>
                  )}
                  {generatePageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationEllipsis key={index} />
                    ) : (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  {next && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageClick(currentPage + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TransactionPagination;
