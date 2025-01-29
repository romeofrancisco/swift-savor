import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";

const EmployeeSalesChart = () => {
  const { employee_sales = [] } = useSelector((state) => state.charts);

  if (!employee_sales || employee_sales.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No data available</p>
    );
  }

  // Extract employee names dynamically (excluding the "month" field)
  const employees = Object.keys(employee_sales[0]).filter(
    (key) => key !== "month"
  );

  // Chart color configuration dynamically based on employees
  const chartConfig = employees.reduce((config, employee, index) => {
    config[employee] = {
      label: employee,
      color: [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ][index % 5], // Cycling through colors
    };
    return config;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Sales Chart</CardTitle>
        <CardDescription>
          Sales performance for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-ratio w-full h-[400px]"
        >
          <LineChart
            accessibilityLayer
            data={employee_sales}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              className="min-w-[10rem]"
            />

            {/* Generate lines dynamically for each employee */}
            {employees.map((employee) => (
              <Line
                key={employee}
                dataKey={employee}
                type="monotone"
                stroke={chartConfig[employee].color}
                strokeWidth={3}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EmployeeSalesChart;
