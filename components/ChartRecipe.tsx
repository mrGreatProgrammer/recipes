"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  carbs: {
    label: "углеводы",
    color: "hsl(var(--chart-1))",
  },
  protein: {
    label: "Белки",
    color: "hsl(var(--chart-2))",
  },
  fat: {
    label: "Жиры",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;



const ChartRecipe: React.FC<{
  fat: number | undefined;
  protein: number | undefined;
  carbs: number | undefined;
  kkal: number | undefined;
}> = ({ carbs, fat, kkal, protein }) => {
  const chartData = [
    { label: "carbs", data: carbs, fill: "var(--color-carbs)" },
    { label: "protein", data: protein, fill: "var(--color-protein)" },
    { label: "fat", data: fat, fill: "var(--color-fat)" },
  ];

  const total = React.useMemo(() => {
    // @ts-ignore
    return chartData.reduce((acc, curr) => acc + curr.data, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Нутри содержимое</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="data"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {/* {total.toLocaleString()} */}
                          {kkal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Калории
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <div>Жиры: {fat}g</div>
          <div>Углеводы: {carbs}g</div>
          <div>Белки: {protein}g</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartRecipe;
