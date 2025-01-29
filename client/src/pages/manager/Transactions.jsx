import React from 'react'
import TransactionsTable from "@/components/Manager/Transactions/TransactionsTable";
import { useDispatch } from "react-redux";
import { getTransactions } from "@/features/transactions/transactionThunk";

const Transactions = () => {
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(getTransactions(1))
  },[dispatch])

  return (
    <div className="page px-5">
      <div className="bg-secondary rounded-md overflow-hidden h-[calc(100vh-5rem)] flex flex-col ">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions
