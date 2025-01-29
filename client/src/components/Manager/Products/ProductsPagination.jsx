import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/features/products/productPaginateThunk";

const ProductsPagination = () => {
  const { count, next, previous, results } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const totalPages = Math.ceil(count / 10);

  // Get current page from previous/next URLs
  const getCurrentPage = () => {
    if (!previous && next) return 1;
    if (previous && !next) return totalPages;
    const match = previous?.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) + 1 : 1;
  };

  // Get ordering from previous or next URL
  const getOrdering = (url) => {
    const match = url?.match(/ordering=([^&]+)/);
    return match ? match[1] : null;
  };

  const currentPage = getCurrentPage();
  const currentOrdering = getOrdering(previous) || getOrdering(next); // Make sure you pass the URL to get the ordering

  const handlePageClick = (page) => {
    dispatch(getProducts({ page, order: currentOrdering }));
  };

  React.useEffect(() => {
    if (results.length < 1 && previous) {
      handlePageClick(currentPage - 1);
    }
  }, [results]);

  const paginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  return (
    <div className="h-[2rem]">
      <Pagination>
        <PaginationContent>
          {previous && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (previous) handlePageClick(currentPage - 1);
                }}
                isActive={!previous}
              />
            </PaginationItem>
          )}

          {(next || previous) && paginationLinks()}

          {next && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (next) handlePageClick(currentPage + 1);
                }}
                isActive={!next}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPagination;
