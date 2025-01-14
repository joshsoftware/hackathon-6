import React from "react";
import DashboardComponent from "./component";
import { useDashboardQuery } from "../../api/api";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardQuery();

  const pieChartData = data?.data.pieChart.map((item: { value: string; count: number }) => ({
    name: item.value,
    value: item.count,
  }));

  const barChartData = data?.data.barChart.map((item: { creative_object_type: string; average_cost: number }) => ({
    creativeType: item.creative_object_type,
    averageCost: item.average_cost,
  }));

  const lineChartData = data?.data.lineChart.map((item: { Cost: number; Clicks: number }) => ({
    cost: item.Cost,
    clicks: item.Clicks,
  }));

  return (
    <div className="container mx-auto p-6">
      {isLoading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-lg text-red-500">Error loading dashboard data</div>}
      {!isLoading && !error && data && (
        <DashboardComponent
          pieChartData={pieChartData}
          barChartData={barChartData}
          lineChartData={lineChartData}
        />
      )}
    </div>
  );
};

export default Dashboard;
