import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

const TopSellingCategories = () => {
  const { categories_sales } = useSelector((state) => state.charts);

  const chartData = categories_sales.map((category, index) => ({
    ...category,
    color: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ][index % 5], // Cycling through defined colors for each category
  }));

  // Config for categories with dynamic colors
  const chartConfig = categories_sales.reduce((config, item, index) => {
    config[item.category] = {
      label: item.category, // Using item name as label
      color: chartData[index].color, // Color mapped dynamically
    };
    return config;
  }, {});

  console.log(chartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Categories</CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="total_sales"
              fill="hsl(var(--primary))"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopSellingCategories;
