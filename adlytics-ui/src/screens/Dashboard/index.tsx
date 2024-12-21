import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useDashboardQuery } from "../../api/api";

// Define custom colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardQuery();

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error || !data) {
    return <div className="text-center text-lg text-red-500">Error loading dashboard data</div>;
  }

  // Process pie chart data
  const pieChartData = data.data.pieChart.map((item: { value: string; count: number }) => ({
    name: item.value,
    value: item.count,
  }));

  // Process bar chart data
  const barChartData = data.data.barChart.map((item: { creative_object_type: string; average_cost: number }) => ({
    creativeType: item.creative_object_type,
    averageCost: item.average_cost,
  }));

  // Process line chart data
  const lineChartData = data.data.lineChart.map((item: { Cost: number; Clicks: number }) => ({
    cost: item.Cost,
    clicks: item.Clicks,
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Dashboard</h1>
      
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {/* Pie Chart */}
        <div className="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-medium mb-4 text-center">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry: { name: string; value: number }, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-medium mb-4 text-center">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="creativeType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageCost" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-medium mb-4 text-center">Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
            <ReferenceLine y={0} stroke="#000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
