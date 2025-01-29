import React from "react";
import SalesStatisticsChart from "@/components/Manager/Dashboard/SalesStatisticsChart";
import TopSellingItemsChart from "@/components/Manager/Dashboard/TopSellingItemsChart";
import EmployeeSalesChart from "@/components/Manager/Dashboard/EmployeeSalesChart";
import TopSellingCategories from "@/components/Manager/Dashboard/TopSellingCategories";
import { ScrollArea } from "@/components/ui/scroll-area";
import SummaryCards from "@/components/Manager/Dashboard/SummaryCards";
import { useDispatch } from "react-redux";
import { getChart } from "@/features/charts/chartThunk";

const Dashboard = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getChart())
  }, [dispatch])
  return (
    <ScrollArea className="h-screen">
      <SummaryCards />
      <div className="page px-10 pb-[6rem] overflow-y-auto">
        <div className="grid grid-cols-9 gap-10">
          <div className="col-span-6">
            <SalesStatisticsChart />
          </div>
          <div className="col-span-3">
            <TopSellingItemsChart />
          </div>
          <div className="col-span-3">
            <TopSellingCategories />
          </div>
          <div className="col-span-6">
            <EmployeeSalesChart />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
