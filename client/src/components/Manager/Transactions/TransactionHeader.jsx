import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Search, Filter, FilterX } from "lucide-react";
import { getTransactions } from "@/features/transactions/transactionThunk";
import { useDispatch } from "react-redux";
import {
  setDateFilter,
  setCurrentPage,
} from "@/features/transactions/transactionSlice";

const TransactionHeader = () => {
  const [filter, setFilter] = useState(false);
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const dispatch = useDispatch();

  const handleOnFilter = () => {
    if (!date?.from && !date?.to) {
      return;
    }

    if (!filter) {
      const start_date = format(date.from, "yyyy-MM-dd ");
      const end_date = format(date.to, "yyyy-MM-dd ");

      const payload = {
        start_date: start_date,
        end_date: end_date,
      };
      dispatch(setDateFilter(payload));
      dispatch(setCurrentPage(1));
      dispatch(getTransactions({ ...payload, page: 1 }));
    } else {
      dispatch(setDateFilter({}));
      dispatch(setCurrentPage(1));
      dispatch(getTransactions(1));
    }
    setFilter(!filter);
  };

  return (
    <div className="flex items-end justify-between px-5 h-[3.3rem]">

      <div className="flex items-center gap-1 h-9">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              disabled={filter ? true : false}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="icon" onClick={handleOnFilter}>
          {filter ? <FilterX /> : <Filter />}
        </Button>
      </div>
    </div>
  );
};

export default TransactionHeader;
